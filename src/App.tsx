import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
}

export default App;
