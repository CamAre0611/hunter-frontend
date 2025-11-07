import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function GestureScreen() {
  const tap = Gesture.Tap().onEnd(() => Alert.alert('Gestos', 'Toque detectado'));

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        <Text style={styles.title}>Toca la pantalla</Text>
        <Text style={styles.text}>Este ejemplo usa react-native-gesture-handler v2.</Text>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#ffd700', fontSize: 22, fontWeight: 'bold' },
  text: { color: '#cbd5e1', marginTop: 8 }
});
