import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerScreen() {
  const [image, setImage] = React.useState(null);

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  }

  return (
    <View style={styles.container}>
      <Button title="Seleccionar imagen de la galería" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020', justifyContent: 'center', alignItems: 'center', padding: 20 },
  preview: { width: 240, height: 240, borderRadius: 12, marginTop: 20 }
});
