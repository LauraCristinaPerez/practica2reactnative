import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TaskContext } from '../../components/TaskContext';
import { ListRenderItem } from 'react-native';

const cycleStatus = (status: TaskStatus): TaskStatus => {
  switch (status) {
    case TaskStatus.PENDING:
      return TaskStatus.IN_PROGRESS;
    case TaskStatus.IN_PROGRESS:
      return TaskStatus.COMPLETED;
    case TaskStatus.COMPLETED:
      return TaskStatus.PENDING;
    default:
      return TaskStatus.PENDING;
  }
};
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
};

export default function TaskDetailScreen() {
  const { tasks, updateStatus, updateTask } = useContext(TaskContext);

  const [editedTaskId, setEditedTaskId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<Task>>({});

  const handleEdit = (task: Task) => {
    setEditedTaskId(task.id);
    setEditedData(task);
  };

  const handleCancel = () => {
    setEditedTaskId(null);
    setEditedData({});
  };

  const handleSave = () => {
    if (!editedData.id || !editedData.title || !editedData.description || !editedData.responsible) {
      return Alert.alert('Completa todos los campos');
    }
    console.log('datos a guardar');

    updateTask(editedData as Task);
    handleCancel();
  };

  const getProgress = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return '0%';
      case TaskStatus.IN_PROGRESS:
        return '50%';
      case TaskStatus.COMPLETED:
        return '100%';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return { color: '#ff4800' };
      case TaskStatus.IN_PROGRESS:
        return { color: '#0d92fe' };
      case TaskStatus.COMPLETED:
        return { color: '#27b72c' };
      default:
        return {};
    }
  };

  const handleStatusChange = (id: string, currentStatus: TaskStatus) => {
    const nextStatus = cycleStatus(currentStatus);
    updateStatus(id, nextStatus);
  };

  const renderItem: ListRenderItem<Task> = ({ item }) => {
    const isEditingThisTask = editedTaskId === item.id;

    return (
      <View style={styles.card}>
        {isEditingThisTask ? (
          <>
            <Text style={styles.label}>Título:</Text>
            <TextInput
              style={styles.input}
              value={editedData.title}
              onChangeText={(text) => setEditedData({ ...editedData, title: text })}
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.input}
              value={editedData.description}
              onChangeText={(text) => setEditedData({ ...editedData, description: text })}
            />

            <Text style={styles.label}>Responsable:</Text>
            <TextInput
              style={styles.input}
              value={editedData.responsible}
              onChangeText={(text) => setEditedData({ ...editedData, responsible: text })}
            />

            <TouchableOpacity style={styles.editButton} onPress={handleSave}>
              <Text style={styles.editButtonText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={handleCancel}>
              <Text style={styles.editButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Descripción:</Text> {item.description}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Responsable:</Text> {item.responsible}
            </Text>
            <Text style={[styles.status, getStatusColor(item.status as TaskStatus)]}>
              Estado: {item.status.replace('_', ' ')}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Progreso:</Text> {getProgress(item.status as TaskStatus)}
            </Text>

            <TouchableOpacity style={styles.editButton} onPress={() => handleStatusChange(item.id, item.status as TaskStatus)}>
              <Text style={styles.editButtonText}>Editar Estado</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
              <Text style={styles.editButtonText}>Editar Tarea</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  card: {
    backgroundColor: 'withe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },

  label: { fontWeight: '600' },

  text: { marginBottom: 6 },

  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'capitalize',
  },

  editButton: {
    backgroundColor: '#3b92eaff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginTop: 10,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    color: 'white',
  },

  saveButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});
