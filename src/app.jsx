import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigations';
import { store, storePersisted } from './redux';
import { theme } from './utils';


export default () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={storePersisted}>
        <SafeAreaProvider>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <StatusBar />
              <Navigation />
            </NavigationContainer>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
