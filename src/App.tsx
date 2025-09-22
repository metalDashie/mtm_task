import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation/app-navigation.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
