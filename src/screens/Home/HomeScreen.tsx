import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TabBar } from '../../components/shared/tabbar';
import { TaskContext } from '../../components/TaskContext';
import { useTasks } from './TaskDetailScreen';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert } from 'react-native';



export default function HomeScreen({ navigation }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responsible, setResponsible] = useState('');

    const taskSchema = Yup.object().shape({
        title: Yup.string().required('el Titulo de la tarea es obligatorio'),
        description: Yup.string().required("La descripción es obligatoria"),
        responsible: Yup.string().required("El responsable es obligatorio"),

    });

    const { addTask } = useTasks();

    const onAdd = async () => {
        try {
            await taskSchema.validate({ title, description, responsible });

            const newTask: Task = {
                id: Date.now().toString(),
                title,
                description,
                responsible,
                status: TaskStatus.PENDING
            };
            addTask(newTask);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert("Error de validación", error.message);
            }
        }
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