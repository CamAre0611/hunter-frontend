import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ModalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información adicional</Text>
      <Text style={styles.text}>Este modal demuestra navegación con presentación tipo modal.</Text>
      <Button title="Cerrar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#ffd700', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { color: '#e5e7eb', textAlign: 'center', marginBottom: 20 }
});
