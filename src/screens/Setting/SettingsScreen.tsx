
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SettingsStyle as style } from './SettingsStyle';
export default function SettingsScreen() {
  const [profile, setProfile] = useState();

  return (
    <View>
      <Text style={style.textprueba}>Pantalla de Configuración</Text>
    </View>
  );
}
