import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { caballero } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: caballero.imagen }} style={styles.image} />
        <Text style={styles.name}>{caballero.nombre}</Text>
        <Text style={styles.text}>Constelación: {caballero.constelacion}</Text>
        <Text style={styles.text}>Altura: {caballero.altura}</Text>
        <Text style={styles.text}>Peso: {caballero.peso}</Text>
        <Text style={styles.text}>Edad: {caballero.edad}</Text>
        <Text style={styles.text}>Técnica: {caballero.tecnica}</Text>
        <Text style={styles.text}>Entrenamiento: {caballero.entrenamiento}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f24' },
  card: { alignItems: 'center', padding: 20 },
  image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 10 },
  text: { color: '#fff', fontSize: 16, marginBottom: 5 }
});
