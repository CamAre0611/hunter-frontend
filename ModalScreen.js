import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Este es un modal</Text>
      <Button title="Cerrar" onPress={() => navigation.goBack()} />
    </View>
  );
}
