import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador: {contador}</Text>

      <Button title="Incrementar" onPress={() => setContador(contador + 2)} />
      <View style={styles.space} />
      <Button title="Disminuir" onPress={() => setContador(contador - 2)} />
      <View style={styles.space} />
      <Button title="Reiniciar" onPress={() => setContador(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: 'Italic',
  },
  space: {
    height: 10,
  },
});
