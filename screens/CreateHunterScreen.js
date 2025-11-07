import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://127.0.0.1:4000';

export default function CreateHunterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    altura: '',
    peso: '',
    imagen: '',
    database: 'mongo' // Por defecto usamos MongoDB
  });

  const handleCreate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/hunter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el personaje');
      }

      Alert.alert('Éxito', 'Personaje creado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LinearGradient colors={['#0b1020', '#1a1a2e', '#0b1020']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear Nuevo Cazador</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#aaa"
            value={formData.nombre}
            onChangeText={(text) => setFormData({ ...formData, nombre: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Edad"
            placeholderTextColor="#aaa"
            value={formData.edad}
            onChangeText={(text) => setFormData({ ...formData, edad: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Altura (cm)"
            placeholderTextColor="#aaa"
            value={formData.altura}
            onChangeText={(text) => setFormData({ ...formData, altura: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            placeholderTextColor="#aaa"
            value={formData.peso}
            onChangeText={(text) => setFormData({ ...formData, peso: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="URL de la imagen"
            placeholderTextColor="#aaa"
            value={formData.imagen}
            onChangeText={(text) => setFormData({ ...formData, imagen: text })}
          />

          <View style={styles.databaseSelector}>
            <Text style={styles.databaseLabel}>Base de datos:</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.databaseButton,
                  formData.database === 'mongo' && styles.databaseButtonActive
                ]}
                onPress={() => setFormData({ ...formData, database: 'mongo' })}
              >
                <Text style={styles.databaseButtonText}>MongoDB</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.databaseButton,
                  formData.database === 'sql' && styles.databaseButtonActive
                ]}
                onPress={() => setFormData({ ...formData, database: 'sql' })}
              >
                <Text style={styles.databaseButtonText}>MySQL</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <LinearGradient
              colors={['#ffd700', '#e6b800']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Crear Cazador</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    color: '#ffd700',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(255,215,0,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  form: {
    backgroundColor: 'rgba(30,41,59,0.7)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  input: {
    backgroundColor: 'rgba(15,23,42,0.9)',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  databaseSelector: {
    marginBottom: 20,
  },
  databaseLabel: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  databaseButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(15,23,42,0.9)',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  databaseButtonActive: {
    backgroundColor: '#ffd700',
  },
  databaseButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#0b1020',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,77,77,0.2)',
    borderWidth: 1,
    borderColor: '#ff4d4d',
  },
  cancelButtonText: {
    color: '#ff4d4d',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});