import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  displayRemoteMessage,
  openFromNotificationData,
  registerNotificationOpenHandlers,
} from './helpers/notifications';
import Navigation from './navigations';
import {navigationRef} from './navigations/hooks';
import {store, storePersisted} from './redux';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Data-only messages need an explicit local notification for sound in background.
  if (!remoteMessage?.notification) {
    await displayRemoteMessage(remoteMessage);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    openFromNotificationData(detail?.notification?.data);
  }
});

export default () => {
  useEffect(() => {
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      await displayRemoteMessage(remoteMessage);
    });
    const unsubscribeNotifee = registerNotificationOpenHandlers();
    return () => {
      unsubscribeForeground();
      unsubscribeNotifee?.();
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={storePersisted}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar />
            <Navigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
