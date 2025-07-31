import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList, Task } from '../../infrastructure/type/route';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TabBar = () => {
    const navigation = useNavigation<NavigationProp>();

    const exampleTask: Task = {
        id: '1',
        title: 'Tarea de ejemplo',
        description: 'Esta es una descripción de prueba',
        assignedTo: 'Laura Pérez',
    };

    return (
        <View style={styles.tabBarContainer}>
            { }
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('ListadeTareas')}
            >
                <Text style={styles.tabText}>Lista de Tarea</Text>
            </TouchableOpacity>

            { }
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('Status')}
            >
                <Text style={styles.tabText}>Status de Tarea</Text>
            </TouchableOpacity>

            { }
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('DetalleTarea', { task: exampleTask })}
            >
                <Text style={styles.tabText}>Detalles de Tareas</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: '#ffd9ed',
        borderTopWidth: 1,
        borderTopColor: '#ffa6e6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 6,
    },

    tabButton: {
        flex: 1,
        backgroundColor: '#5B3CC4',
        paddingVertical: 14,
        marginHorizontal: 5,
        borderRadius: 30,
        shadowColor: '#5B3CC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center',
    },

    tabText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center'
    },
});
