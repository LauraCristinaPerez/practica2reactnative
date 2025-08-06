import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { TaskProvider } from './src/components/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/components/TaskContext';
import { useFonts } from 'expo-font';
import { Picker } from '@react-native-picker/picker';
export default function App() {

  const [fontsLoaded] = useFonts({

    Playwrite: require('./src/assets/fonts/PlaywriteAUQLD-VariableFont_wght.ttf'),
    WinkyRough: require('./src/assets/fonts/WinkyRough-Italic-VariableFont_wght.ttf'),
  })
  return (
    // <TaskProvider>
    <NavigationContainer>
      <TaskProvider>

        <AppNavigator />
      </TaskProvider>

    </NavigationContainer>

  );
}



