import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import CreateHunterScreen from './screens/CreateHunterScreen';
import DetailScreen from './screens/DetailScreen';
import EditHunterScreen from './screens/EditHunterScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0b1020" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#0b1020' },
            headerTintColor: '#ffd700',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#0b1020' },
            headerTitleAlign: 'center',
            animation: 'fade',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Hunter x Hunter',
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: 'Detalle del Cazador',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="CreateHunter"
            component={CreateHunterScreen}
            options={{
              title: 'Crear Cazador',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="EditHunter"
            component={EditHunterScreen}
            options={{
              title: 'Editar Cazador',
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
