import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TabBar } from '../../components/shared/tabbar';
import { TaskContext } from '../../components/TaskContext';
import { ListRenderItem } from 'react-native';

// Hook para acceder al contexto
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
};

// Función para cambiar al siguiente estado cíclico
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

// Componente principal
export default function TaskDetailScreen() {
  const { tasks, updateStatus } = useTasks();

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
        return { color: '#FF9800' };
      case TaskStatus.IN_PROGRESS:
        return { color: '#2196F3' };
      case TaskStatus.COMPLETED:
        return { color: '#4CAF50' };
      default:
        return {};
    }
  };

  const handleStatusChange = (id: string, currentStatus: TaskStatus) => {
    const nextStatus = cycleStatus(currentStatus);
    updateStatus(id, nextStatus);
  };

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.card}>
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

      <TouchableOpacity onPress={() => handleStatusChange(item.id, item.status as TaskStatus)}></TouchableOpacity>

      <Text style={styles.text}>
        <Text style={styles.label}>Progreso:</Text> {getProgress(item.status as TaskStatus)}
      </Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleStatusChange(item.id, item.status as TaskStatus)}
      >
        <Text style={styles.editButtonText}>Editar Estado</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TabBar />
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


});
