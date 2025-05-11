import React from 'react';
import { enableScreens } from 'react-native-screens'; // 👈 Importá esto
import AppNavigator from './navigations/AppNavigator';

enableScreens(); // 👈 Activá react-native-screens antes de montar la navegación

export default function App() {
  return <AppNavigator />;
}
