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
                onPress={() => navigation.navigate('Añadir_Tarea_Especifica')}
            >
                <Text style={styles.tabText}>Añadir Tarea</Text>
            </TouchableOpacity>

            { }
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('Detalle_De_Tarea_Especifica', { task: exampleTask })}
            >
                <Text style={styles.tabText}>Detalles de Tareas</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        //paddingHorizontal: 10,
        backgroundColor: '#F3E2D4',
        borderTopWidth: 1,
        borderTopColor: '#9696963c',
        shadowColor: 'withe',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 6,
    },

    tabButton: {
        flex: 1,
        backgroundColor: '#A97954',
        paddingVertical: 14,
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#a5a5a5ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center',
    },

    tabText: {
        color: '#532c2e',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'WikyRough',
    },
});
