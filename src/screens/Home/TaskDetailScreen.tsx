import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TabBar } from '../../components/shared/tabbar';
import { useContext } from 'react';
import { TaskContext } from '../../components/TaskContext';
import { TouchableOpacity } from 'react-native';
import { ListRenderItem } from 'react-native';



export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks debe usarse dentro de un TaskProvider');
    }
    return context;
};

export default function TaskDetailScreen() {
    const { tasks } = useTasks();

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

    const stringToStatus = (status: string): TaskStatus => {
        switch (status) {
            case "pendiente":
                return TaskStatus.PENDING;
            case "en progreso":
                return TaskStatus.IN_PROGRESS;
            case "completada":
                return TaskStatus.COMPLETED;
            default:
                return TaskStatus.PENDING;
        }
    };

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}><Text style={styles.label}>Descripción:</Text> {item.description}</Text>
            <Text style={styles.text}><Text style={styles.label}>Responsable:</Text> {item.responsible}</Text>
            <Text style={styles.text}>
                <Text style={styles.label}>Estado:</Text>{' '}
                <Text style={[styles.status, getStatusColor(stringToStatus(item.status))]}>
                    {item.status.replace('_', ' ')}
                </Text>
            </Text>
            <Text style={styles.text}>
                <Text style={styles.label}>Progreso:</Text> {getProgress(stringToStatus(item.status))}
            </Text>

        </View>
    );

    const { updateStatus } = useTasks();
    const renderItem: ListRenderItem<Task> = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity onPress={() => updateStatus(item.id, item.status)}>
                <Text style={[styles.status, getStatusColor(item.status as TaskStatus)]}>
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
                renderItem={renderTask}
                keyExtractor={(item) => item.id}

            />
            <TabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    label: { fontWeight: '600' },
    text: { marginBottom: 6 },
    status: { textTransform: 'capitalize', fontWeight: 'bold' },
});
