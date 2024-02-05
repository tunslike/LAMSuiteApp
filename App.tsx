import 'react-native-gesture-handler'
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import Router from './src/views/navigation/Router';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaProvider>
      <AuthProvider>
          <Router />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App;
