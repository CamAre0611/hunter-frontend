import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [nombre, setNombre] = useState('');

  const buscarCaballero = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre del caballero.');
      return;
    }

    try {
      const res = await fetch(`http://192.168.0.10:4000/caballero/${nombre}`);
      if (!res.ok) throw new Error('Caballero no encontrado');
      const data = await res.json();
      navigation.navigate('Detail', { caballero: data });
    } catch (error) {
      Alert.alert('Error', 'Caballero no encontrado o servidor inaccesible.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Caballeros Dorados</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Mu, Saga, Aiolos..."
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity style={styles.button} onPress={buscarCaballero}>
        <Text style={styles.buttonText}>Consultar Caballero</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f24', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, color: '#FFD700', marginBottom: 20, fontWeight: 'bold' },
  input: { width: '100%', backgroundColor: '#1c2237', color: 'white', padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#E63946', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
