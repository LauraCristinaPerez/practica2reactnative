import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { TaskProvider } from './src/components/TaskContext';
import AppNavigator from './src/navigation/AppNavigator'; // Asegúrate de tener esto creado

export default function App() {
  return (
    // <TaskProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>

  );
}



