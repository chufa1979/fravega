import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from '../context/FavoritesContext';  // Asegúrate de importar el proveedor
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserDetailScreen from '../screens/UserDetails/UserDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  UserDetail: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <FavoritesProvider>  {/* Aquí envuelves todo el navegador */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
