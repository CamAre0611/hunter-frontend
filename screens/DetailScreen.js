import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL, BASE_URL as CONFIG_BASE_URL } from '../src/config';

// Usar la URL del backend desplegado (configurable en src/config.js)
const BASE_URL = API_URL || CONFIG_BASE_URL;

export default function DetailScreen({ route, navigation }) {
  const { cazador } = route.params;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Animación del aura dorada
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ).start();
  }, []);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(cazador.imagen)}&w=600&h=800&fit=contain`;

  return (
    <LinearGradient colors={['#0b1020', '#1a1a2e', '#0b1020']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{cazador.nombre}</Text>

        <View style={styles.imageWrapper}>
          {loading && <ActivityIndicator size="large" color="#ffd700" style={styles.loader} />}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
            onLoadEnd={() => setLoading(false)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <LinearGradient
            colors={['#ffd700', '#e6b800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Ver información</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.animatedAura,
                { transform: [{ rotate }] }
              ]}
            >
              <LinearGradient
                colors={['rgba(255, 215, 0, 0.4)', 'transparent', 'rgba(255, 215, 0, 0.4)']}
                style={styles.gradientAura}
              />
            </Animated.View>

            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Información de {cazador.nombre}</Text>

              <View style={styles.infoBox}>
                <Text style={styles.text}>😌 Nombre: <Text style={styles.value}>{cazador.nombre}</Text></Text> 
                <Text style={styles.text}>🎂 Edad: <Text style={styles.value}>{cazador.edad}</Text></Text>
                <Text style={styles.text}>📏 Altura: <Text style={styles.value}>{cazador.altura}</Text></Text>
                <Text style={styles.text}>⚖️ Peso: <Text style={styles.value}>{cazador.peso}</Text></Text>
              </View>

              <TouchableOpacity 
                style={[styles.button, { marginBottom: 10, backgroundColor: '#2ecc71' }]}
                onPress={() => {
                  console.log('🔵 Botón de prueba presionado');
                  Alert.alert('Prueba', 'Este es un botón de prueba');
                }}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Botón de Prueba</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                  console.log('✏️ Botón editar presionado');
                  setModalVisible(false);
                  navigation.navigate('EditHunter', { cazador });
                }}>
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={async () => {
                    console.log('🔘 Botón eliminar presionado');

                    const doDelete = async () => {
                      try {
                        console.log('✅ Eliminación confirmada, procediendo...');
                        console.log('🔍 Datos completos del cazador:', JSON.stringify(cazador, null, 2));
                        console.log('🔑 Propiedades disponibles:', Object.keys(cazador));

                        const nombre = cazador.nombre;
                        if (!nombre) throw new Error('No se encontró el nombre del cazador');

                        console.log(`🗑️ Intentando eliminar cazador con nombre:`, nombre);
                        console.log(`📡 URL de eliminación: ${BASE_URL}/hunter/byname/${encodeURIComponent(nombre)}`);

                        console.log('🌐 Iniciando solicitud fetch...');
                        const response = await fetch(`${BASE_URL}/hunter/byname/${encodeURIComponent(nombre)}`, {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                        });
                        console.log('🌐 Solicitud fetch completada');

                        console.log('📥 Respuesta del servidor - Status:', response.status);
                        const responseText = await response.text();
                        console.log('📝 Respuesta del servidor - Texto:', responseText);

                        try {
                          const responseData = JSON.parse(responseText);
                          console.log('📦 Respuesta parseada:', JSON.stringify(responseData, null, 2));
                        } catch (e) {
                          console.log('⚠️ La respuesta no es JSON válido');
                        }

                        if (!response.ok) {
                          let errorMessage = 'Error al eliminar el personaje';
                          try {
                            const errorData = JSON.parse(responseText);
                            errorMessage = errorData.error || errorMessage;
                            console.error('❌ Error del servidor:', errorData);
                          } catch (e) {
                            console.error('❌ Error al parsear respuesta:', e);
                          }
                          throw new Error(errorMessage);
                        }

                        console.log('🔄 Cerrando modal...');
                        setModalVisible(false);
                        console.log('✨ Mostrando alerta de éxito...');
                        Alert.alert('Éxito', `${cazador.nombre} ha sido eliminado correctamente`, [
                          {
                            text: 'OK',
                            onPress: () => {
                              console.log('🏠 Navegando al Home...');
                              navigation.reset({ index: 0, routes: [{ name: 'Home', params: { refresh: Date.now(), deleted: true, deletedName: cazador.nombre } }] });
                            }
                          }
                        ]);
                      } catch (error) {
                        console.error('❌ Error al eliminar:', error);
                        console.error('📄 Stack:', error.stack);
                        console.error('🔍 Detalles adicionales:', { cazador, baseUrl: BASE_URL, platform: Platform.OS, windowLocation: window.location?.href });
                        Alert.alert('Error', `No se pudo eliminar a ${cazador.nombre}. ${error.message}`, [{ text: 'OK', onPress: () => console.log('🔄 Alerta de error cerrada') }]);
                      }
                    };

                    // En web, Alert.alert puede no funcionar correctamente; usar window.confirm
                    if (Platform.OS === 'web') {
                      const confirmed = window.confirm(`¿Estás seguro que deseas eliminar a ${cazador.nombre}?`);
                      if (confirmed) {
                        console.log('✅ Confirmado via window.confirm');
                        await doDelete();
                      } else {
                        console.log('❌ Eliminación cancelada via window.confirm');
                      }
                    } else {
                      // Usar Alert en móviles
                      Alert.alert('Confirmar eliminación', `¿Estás seguro que deseas eliminar a ${cazador.nombre}?`, [
                        { text: 'Cancelar', style: 'cancel', onPress: () => console.log('❌ Eliminación cancelada') },
                        { text: 'Eliminar', style: 'destructive', onPress: doDelete }
                      ]);
                    }
                  }}>
                  <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  content: { alignItems: 'center', padding: 20 },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 10,
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 1
  },
  backButtonText: {
    color: '#0b1020',
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    color: '#ffd700',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255,215,0,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  imageWrapper: {
    width: 270,
    height: 400,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffd700'
  },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  loader: { position: 'absolute', zIndex: 2 },
  button: { width: '80%', borderRadius: 8, overflow: 'hidden', marginBottom: 20 },
  buttonGradient: { paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#0b1020', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffd700',
    elevation: 10
  },
  animatedAura: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientAura: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 200,
    opacity: 0.6
  },
  modalTitle: { color: '#ffd700', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  infoBox: { alignItems: 'center' },
  text: { color: '#cbd5e1', fontSize: 16, marginBottom: 8, textAlign: 'center' },
  value: { color: '#ffd700', fontWeight: 'bold' },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  closeButtonText: { color: '#0b1020', fontWeight: 'bold', fontSize: 16 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 5
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 5
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});
