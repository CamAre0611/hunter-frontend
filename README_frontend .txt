Frontend - Caballeros del Zodiaco

Aplicación en React Native (Expo) que consulta el backend Express + MongoDB para mostrar información de los Caballeros Dorados.

------------------------------------------
REQUISITOS
------------------------------------------
- Node.js 18 o superior
- npm o yarn
- Backend en http://localhost:4000 activo

------------------------------------------
INSTALACIÓN PASO A PASO
------------------------------------------
1. Clonar o copiar la carpeta frontend.
2. Abrir una terminal dentro de la carpeta frontend.
3. Instalar dependencias base del proyecto:
   npm install
4. Instalar dependencias necesarias para Web:
   npx expo install react-native-web react-dom @expo/metro-runtime
5. Instalar navegación y dependencias nativas:
   npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler
6. Instalar utilidades de Expo usadas en la interfaz:
   npx expo install expo-linear-gradient expo-status-bar
7. Verificar que el backend esté ejecutándose en:
   http://localhost:4000

------------------------------------------
CONFIGURACIÓN DE ENTRADA
------------------------------------------
Asegurar archivo index.js en la raíz con:
   import { registerRootComponent } from 'expo';
   import App from './App';
   registerRootComponent(App);

En package.json debe existir:
   "main": "index.js"

------------------------------------------
CONFIGURACIÓN DE CONEXIÓN AL BACKEND
------------------------------------------
HomeScreen usa detección de plataforma:
   const BASE_URL =
     Platform.OS === 'android'
       ? 'http://10.0.2.2:4000'   // Emulador Android
       : 'http://127.0.0.1:4000'; // Web o iOS

Si se usa dispositivo físico en la misma red, reemplazar por la IP local de tu PC, por ejemplo:
   const BASE_URL = 'http://192.168.1.8:4000';

------------------------------------------
EJECUCIÓN
------------------------------------------
Iniciar el proyecto:
   npx expo start -c

Abrir objetivo:
   Presiona w para Web
   Presiona a para Android
   Presiona i para iOS

------------------------------------------
ESTRUCTURA
------------------------------------------
frontend/
├── App.js
├── index.js
├── package.json
├── screens/
│   ├── HomeScreen.js
│   └── DetailScreen.js
└── README_frontend.txt

------------------------------------------
FUNCIONALIDAD
------------------------------------------
- Búsqueda por nombre contra el endpoint /caballero/:nombre
- Pantalla de detalle con imagen y datos del caballero
- Modal con información detallada y fondo con aura animada
- Estilos coherentes con temática dorada

------------------------------------------
IMÁGENES EN WEB (CORS)
------------------------------------------
Para evitar bloqueos CORS en Web, las imágenes se cargan mediante proxy:
   https://wsrv.nl/?url=...&fit=contain
Si una imagen no carga, revisar la URL original o cambiar a otra fuente.

------------------------------------------
PROBLEMAS FRECUENTES
------------------------------------------
Pantalla en blanco:
- Ejecutar npx expo start -c
- Revisar que main apunte a index.js y exista el archivo index.js
- Ver la consola del navegador por errores

Error de conexión al backend:
- Confirmar BASE_URL correcto según plataforma
- Verificar que el backend responde en http://localhost:4000/caballero/Mu

Imágenes no se ven en Web:
- Mantener resizeMode="contain" y usar el proxy wsrv.nl
- Probar con otra URL de imagen

No arranca Web y pide dependencias:
- Ejecutar el paso 4 (instalar react-native-web, react-dom, @expo/metro-runtime)

------------------------------------------
VERSIONES DE REFERENCIA
------------------------------------------
expo ~51.0.28
react 18.2.0
react-native 0.74.5
react-dom 18.2.0
react-native-web ~0.19.10
@expo/metro-runtime ~3.2.3
@react-navigation/native ^6.1.17
@react-navigation/native-stack ^6.9.26
react-native-gesture-handler ~2.16.2
react-native-safe-area-context 4.10.5
react-native-screens ~3.31.1
expo-linear-gradient ~13.0.2
expo-status-bar ~1.12.1
typescript ~5.3.3 (si se usa TS)

------------------------------------------
CONTACTO
------------------------------------------
Documento preparado para replicación por terceros.
