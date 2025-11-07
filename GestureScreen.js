import React from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function GestureScreen() {
  const tap = Gesture.Tap().onEnd(() => alert('Toque detectado'));

  return (
    <GestureDetector gesture={tap}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Toca la pantalla</Text>
      </View>
    </GestureDetector>
  );
}
