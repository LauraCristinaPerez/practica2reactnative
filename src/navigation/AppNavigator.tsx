// src/navigation/Navigator.tsx
import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/Setting/TaskStatusScreen';
import TaskDetailScreen from '../screens/Home/TaskDetailScreen';
import { RootStackParamList } from '../infrastructure/type/route';
import TaskStatusScreen from '../screens/Setting/TaskStatusScreen';
import { TaskProvider } from '../components/TaskContext';


const Stack = createNativeStackNavigator<RootStackParamList>();
const appNavigation = () => {
  return (
    <TaskProvider>

      <Stack.Navigator initialRouteName="ListadeTareas" id={undefined}>
        <Stack.Screen name="ListadeTareas" component={HomeScreen} />
        <Stack.Screen name="Status" component={TaskStatusScreen} />
        <Stack.Screen name="DetalleTarea" component={TaskDetailScreen} />
      </Stack.Navigator>
    </TaskProvider>
  );
}

export default appNavigation;


