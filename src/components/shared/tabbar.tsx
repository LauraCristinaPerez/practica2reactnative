import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList, Task } from '../../infrastructure/type/route';

// Define el tipo de navegación basado en tus rutas
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TabBar = () => {
    const navigation = useNavigation<NavigationProp>();

    // Tarea de ejemplo
    const exampleTask: Task = {
        id: '1',
        title: 'Tarea de ejemplo',
        description: 'Esta es una descripción de prueba',
        assignedTo: 'Laura Pérez',
    };

    return (
        <View style={styles.tabBarContainer}>
            {/* Botón de navegación a Inicio */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('Inicio')}
            >
                <Text style={styles.tabText}>Inicio</Text>
            </TouchableOpacity>

            {/* Botón de navegación a Configuración */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('Configuración')}
            >
                <Text style={styles.tabText}>Configuración</Text>
            </TouchableOpacity>

            {/* Botón de navegación a DetalleTarea con una tarea ejemplo */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('DetalleTarea', { task: exampleTask })}
            >
                <Text style={styles.tabText}>Detalle</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tabButton: {
        padding: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
});
