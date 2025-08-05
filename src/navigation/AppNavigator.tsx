// src/navigation/Navigator.tsx
import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import TaskDetailScreen from '../screens/DetailsTasks/TaskDetailScreen';
import { RootStackParamList } from '../infrastructure/type/route';
import { TaskProvider } from '../components/TaskContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const appNavigation = () => {
  return (

    <Stack.Navigator initialRouteName="Añadir_Tarea_Especifica" id={undefined}>
      <Stack.Screen name="Añadir_Tarea_Especifica" component={HomeScreen} />

      <Stack.Screen name="Detalle_De_Tarea_Especifica" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}

export default appNavigation;


