import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TabBar } from '../../components/shared/tabbar';
import { TaskContext } from '../../components/TaskContext';
import { useTasks } from './TaskDetailScreen';



export default function HomeScreen({ navigation }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responsible, setResponsible] = useState('');

    const { addTask } = useTasks();

    const onAdd = () => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            responsible,
            status: TaskStatus.PENDING
        };
        addTask(newTask);
    };

    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>
                <Text style={styles.label}>Título de tarea</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} />

                <Text style={styles.label}>Descripción de tarea</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription} />

                <Text style={styles.label}>Responsable</Text>
                <TextInput style={styles.input} value={responsible} onChangeText={setResponsible} />

                <Button title="Agregar tarea" onPress={onAdd} />

            </View>

            <TabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        marginTop: 12,
    },
    label: { fontWeight: 'bold', marginTop: 12 },
    input: {
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
    },
});