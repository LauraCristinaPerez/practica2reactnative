import React from 'react';
import { ListRenderItem } from 'react-native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TaskContext } from '../../components/TaskContext';
import { useContext } from 'react';

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
};

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

const getStatusStyle = (status: TaskStatus) => {
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

export default function TaskStatusScreen() {
  const { tasks, updateStatus } = useTasks();


  const handleStatusChange = (id: string, currentStatus: TaskStatus) => {
    updateStatus(id, cycleStatus(currentStatus));
  };

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleStatusChange(item.id, item.status as TaskStatus)}>
        <Text style={[styles.status, getStatusStyle(item.status as TaskStatus)]}>
          {item.status.replace('_', ' ')}
        </Text>
      </TouchableOpacity>
      <Text>{item.description}</Text>
      <Text>Responsable: {item.responsible}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  title: { fontSize: 16, fontWeight: 'bold' },

  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'capitalize',
  },
});
