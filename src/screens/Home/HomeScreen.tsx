import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Task } from '../../infrastructure/models/Task';
import { TaskStatus } from '../../infrastructure/constants/TaskStatus';
import { TabBar } from '../../components/shared/tabbar';
import { TaskContext } from '../../components/TaskContext';
import { useTasks } from '../DetailsTasks/TaskDetailScreen';
import * as Yup from 'yup';
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { Picker } from '@react-native-picker/picker';


export default function HomeScreen({ navigation }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [responsible, setResponsible] = useState('');
    const { addTask } = useTasks();
    const taskSchema = Yup.object().shape({
        title: Yup.string().required('El título es obligatorio'),
        description: Yup.string().required('La descripción es obligatoria'),
        responsible: Yup.string().required('El responsable es obligatorio'),
    });
    const allFieldsFilled = title.trim() !== '' && description.trim() !== '' && responsible.trim() !== '';
    const onAdd = async () => {
        try {
            await taskSchema.validate({
                title,
                description,
                responsible,
            });

            const newTask: Task = {
                id: Date.now().toString(),
                title,
                description,
                responsible,
                status: TaskStatus.PENDING,
            };

            addTask(newTask);
            // Limpiar los campos
            setTitle('');
            setDescription('');
            setResponsible('');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Error de validación', error.message);
            } else {
                Alert.alert(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.tittle}>Lista De Tareas Importantes</Text>
            </View>

            <View style={styles.formContainer}>
                <Image source={require('../../assets/images/descarga.jpg')} style={styles.image} />

                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Título de tarea</Text>

                        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder='Título' placeholderTextColor={'#A97954'} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Descripción de tarea</Text>

                        <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder='Descripción' placeholderTextColor={'#A97954'} />
                    </View>
                </View>


                <View style={styles.centered}>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.label}>Responsable</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={responsible}
                                onValueChange={(itemValue) => setResponsible(itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#A97954">
                                <Picker.Item label="Laura" value="Laura" />
                                <Picker.Item label="Juan" value="Juan" />
                                <Picker.Item label="Luis" value="Luis" />
                                <Picker.Item label="Angel" value="Angel" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                        styles.buttonContainer,
                        !allFieldsFilled && styles.buttonDisabled
                    ]}
                    onPress={onAdd}
                    disabled={!allFieldsFilled}
                >
                    <Text style={styles.buttonText}>AGREGAR TAREA</Text>
                </TouchableOpacity>
            </View>

            <TabBar />
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E8D4B9',
        paddingTop: 40,
    },
    formContainer: {
        width: '90%',
        padding: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    centered: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    label: {
        fontFamily: 'Playwrite',
        fontSize: 14,
        marginBottom: 5,
        alignSelf: 'center',
    },
    input: {
        borderWidth: 3,
        borderColor: '#A97954',
        height: 45,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f3e2d4ff',
        borderRadius: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        color: '#000',
        elevation: 9
    },
    buttonDisabled: {
        backgroundColor: '#C0A88A',
        opacity: 0.6,
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#A97954',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 25,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 60
    },
    tittle: {
        fontFamily: 'Playwrite',
        fontSize: 30,
        textAlign: 'center',
        color: '#6C4E31',
        marginBottom: 10,
    },
    pickerWrapper: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },

    pickerContainer: {
        width: '90%',
        borderWidth: 3,
        borderColor: '#A97954',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginVertical: 15,
        backgroundColor: '#F3E2D4',
        elevation: 8,

    },

    picker: {
        height: 50,
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',

    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'WinkyRough',
        fontSize: 16,
    },
});
