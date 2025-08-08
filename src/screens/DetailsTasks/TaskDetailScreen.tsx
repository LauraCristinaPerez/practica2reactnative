import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert, TextInput, Animated } from 'react-native';
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
  const handleStatusChange = (id: string, currentStatus: TaskStatus) => {
    const nextStatus = cycleStatus(currentStatus);
    updateStatus(id, nextStatus);
  };

  const handleSave = () => {
    if (!editedData.id || !editedData.title || !editedData.description || !editedData.responsible) {
      return Alert.alert('Completa todos los campos');
    }
    updateTask(editedData as Task);
    handleCancel();
  };

  const getProgress = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return 0;
      case TaskStatus.IN_PROGRESS:
        return 50;
      case TaskStatus.COMPLETED:
        return 100;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return { color: '#982B1C' };
      case TaskStatus.IN_PROGRESS:
        return { color: '#016A70' };
      case TaskStatus.COMPLETED:
        return { color: '#76885B' };
      default:
        return {};
    }
  };

  const AnimatedButton = ({ label, onPress, color }: { label: string; onPress: () => void; color: string }) => {
    const anim = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start();
    };

    const handlePressOut = () => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start(() => onPress());
    };

    const backgroundColor = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [color, '#803D3B']
    });

    return (
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.editButton, { backgroundColor }]}>
          <Text style={styles.editButtonText}>{label}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  const TaskItem = ({ item, editedTaskId }: { item: Task; editedTaskId: string | null }) => {
    const isEditingThisTask = editedTaskId === item.id;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(
      new Animated.Value(getProgress(item.status as TaskStatus))
    ).current;


    useEffect(() => {
      Animated.timing(progressAnim, {
        toValue: getProgress(item.status as TaskStatus),
        duration: 500,
        useNativeDriver: false
      }).start();
    }, [item.status]);

    const onPressInCard = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true
      }).start();
    };
    const onPressOutCard = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true
      }).start();
    };

    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    });

    return (
      <Pressable onPressIn={onPressInCard} onPressOut={onPressOutCard}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
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

              <View style={styles.buttonsRow}>
                <AnimatedButton label="Aceptar" onPress={handleSave} color="#74512D" />
                <AnimatedButton label="Cancelar" onPress={handleCancel} color="#987070" />
              </View>
            </>
          ) : (
            <>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={[styles.status, getStatusColor(item.status as TaskStatus)]}>
                  {item.status.replace('_', ' ')}
                </Text>
              </View>

              <View style={styles.centerInfo}>
                <Text style={styles.text}><Text style={styles.label}>Descripción:</Text> {item.description}</Text>
                <Text style={styles.text}><Text style={styles.label}>Responsable:</Text> {item.responsible}</Text>


                <Text style={styles.text}>
                  <Text style={styles.label}>Progreso:</Text> {getProgress(item.status as TaskStatus)}%
                </Text>


                <View style={styles.progressBarBackground}>
                  <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
                </View>
              </View>

              <View style={styles.buttonsRow}>
                <AnimatedButton label="Editar Estado" onPress={() => handleStatusChange(item.id, item.status as TaskStatus)} color="#74512D" />
                <AnimatedButton label="Editar Tarea" onPress={() => handleEdit(item)} color="#987070" />
              </View>
            </>
          )}
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Aquí puedes ver los detalles de tus Tareas</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem item={item} editedTaskId={editedTaskId} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#DFD3C3' },
  card: {
    backgroundColor: '#F8EDE3',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 5
  },
  tittle: {
    textAlign: 'center',
    fontFamily: 'Pacifico',
    fontSize: 35,
    color: '#733C3C',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: { fontSize: 30, fontFamily: 'Caveat' },
  label: { fontSize: 16, fontFamily: 'WinkyRough', color: '#C5705D', },
  text: { marginBottom: 6, textAlign: 'center' },
  status: {
    fontSize: 16,
    fontFamily: 'WinkyRough',
    textTransform: 'capitalize',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  editButtonText: {
    color: '#F5EFE6',
    fontFamily: 'Playwrite',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#AF8F6F',
    padding: 5,
    marginBottom: 5,
  },
  progressBarBackground: {
    width: '80%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 4
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#016A70'
  }
});
