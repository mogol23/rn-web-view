import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigations';
import { store, storePersisted } from './redux';


export default () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={storePersisted}>
        <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar />
              <Navigation />
            </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
