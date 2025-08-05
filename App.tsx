import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { TaskProvider } from './src/components/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/components/TaskContext';

export default function App() {
  return (
    // <TaskProvider>
    <NavigationContainer>
      <TaskProvider>

        <AppNavigator />
      </TaskProvider>

    </NavigationContainer>

  );
}



