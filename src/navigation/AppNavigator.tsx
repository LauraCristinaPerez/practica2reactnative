// src/navigation/Navigator.tsx
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/Setting/SettingsScreen';
import TaskDetailScreen from '../screens/Home/TaskDetailScreen';
import { RootStackParamList } from '../infrastructure/type/route';

const Stack = createNativeStackNavigator<RootStackParamList>();
const appNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListadeTareas" id={undefined}>
        <Stack.Screen name="ListadeTareas" component={HomeScreen} />
        <Stack.Screen name="Configuración" component={SettingsScreen} />
        <Stack.Screen name="DetalleTarea" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default appNavigation;


