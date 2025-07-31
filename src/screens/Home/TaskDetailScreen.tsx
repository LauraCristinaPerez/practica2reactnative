import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Task } from '../../infrastructure/type/route';

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'DetalleTarea'>;

export default function TaskDetailScreen() {
    const route = useRoute<TaskDetailRouteProp>();
    const { task } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.label}>Descripción:</Text>
            <Text>{task.description}</Text>
            <Text style={styles.label}>Asignado a:</Text>
            <Text>{task.assignedTo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontWeight: 'bold', marginTop: 10 },
});
