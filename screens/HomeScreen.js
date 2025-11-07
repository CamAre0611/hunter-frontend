import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Animated,
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { API_URL, BASE_URL as CONFIG_BASE_URL } from '../src/config';

// Usar la URL del backend desplegado (configurable en src/config.js)
const BASE_URL = API_URL || CONFIG_BASE_URL;

export default function HomeScreen({ navigation, route }) {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [hunters, setHunters] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  // Función para cargar los cazadores
  const loadHunters = async () => {
    try {
      const response = await fetch(`${BASE_URL}/hunters`);
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      setHunters(data);
      return data;
    } catch (err) {
      console.error('Error al cargar cazadores:', err);
      setError('Error al cargar los datos.');
      return [];
    }
  };

  // Cargar cazadores al inicio y cuando se regresa a la pantalla
  React.useEffect(() => {
    loadHunters();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('🔄 Recargando lista de cazadores...');
      loadHunters();
      setSearch('');
      setError('');
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: Platform.OS !== 'web' // Only use native driver on native platforms
    }).start();
  }, []);

  const handleSearch = async () => {
    Keyboard.dismiss();
    if (!search.trim()) {
      setError('Ingresa un nombre para buscar.');
      return;
    }

    try {
      // Buscar en la lista actual de hunters
      const hunter = hunters.find(h => h.nombre.toLowerCase() === search.toLowerCase());
      
      if (!hunter) {
        // Si no se encuentra, intentar recargar la lista
        const freshHunters = await loadHunters();
        const freshHunter = freshHunters.find(h => h.nombre.toLowerCase() === search.toLowerCase());
        
        if (!freshHunter) {
          setError('Personaje no encontrado.');
          return;
        }
      }

      console.log('🔍 Cazador encontrado:', JSON.stringify(hunter, null, 2));
      console.log('🆔 ID del cazador:', hunter._id || hunter.id);
      console.log('💾 Base de datos:', hunter._id ? 'MongoDB' : 'MySQL');
      console.log('🔑 Propiedades disponibles:', Object.keys(hunter));

      setError('');
      // Asegurarnos de pasar el objeto completo sin modificar los IDs
      const hunterToPass = {
        ...hunter,
        // Solo añadimos el ID faltante si es necesario
        ...(hunter._id ? {} : { id: hunter.id }),
        ...(hunter.id ? {} : { _id: hunter._id })
      };
      
      console.log('Enviando cazador a DetailScreen:', hunterToPass);
      console.log('Tipo de base de datos:', hunter._id ? 'MongoDB' : 'MySQL');
      
      navigation.navigate('Detail', { 
        cazador: hunterToPass
      });
    } catch (err) {
      setError('Error de conexión al servidor.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/featured-full/hunter-x-hunter-6l28uunxtr53l0un.jpg' }}
      style={styles.background}
      resizeMode="cover"
      blurRadius={1}
    >
      <LinearGradient
        colors={['rgba(11,16,32,0.9)', 'rgba(0,0,0,0.95)']}
        style={styles.overlay}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Hunter x Hunter</Text>
          <Text style={styles.subtitle}>Explora el mundo de los cazadores</Text>

          <TouchableOpacity 
            style={styles.createButton} 
            onPress={() => navigation.navigate('CreateHunter')}
          >
            <LinearGradient
              colors={['#2ecc71', '#27ae60']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonText}>➕ Crear Nuevo Cazador</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Busca un personaje..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <LinearGradient
              colors={['#ffd700', '#e6b800']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Consultar</Text>
            </LinearGradient>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.7)',
    borderRadius: 16,
    padding: 25,
    ...(Platform.OS === 'web' 
      ? {
          boxShadow: '0 0 12px #ffd700'
        }
      : {
          shadowColor: '#ffd700',
          shadowOpacity: 0.5,
          shadowRadius: 12,
          elevation: 10
        }
    )
  },
  title: {
    color: '#ffd700',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    ...(Platform.OS === 'web'
      ? {
          textShadow: '0 0 10px rgba(255,215,0,0.6)'
        }
      : {
          textShadowColor: 'rgba(255,215,0,0.6)',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10
        }
    )
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 25
  },
  input: {
    backgroundColor: 'rgba(15,23,42,0.9)',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ffd700',
    marginBottom: 15
  },
  button: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: '#0b1020',
    fontWeight: 'bold',
    fontSize: 16
  },
  error: {
    color: '#ff4d4d',
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center'
  },
  createButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20
  },
  createButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
