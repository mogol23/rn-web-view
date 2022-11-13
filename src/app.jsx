import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigations';
import { store, storePersisted } from './redux';
import { navigationRef, navigate } from './navigations/hooks';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    if (__DEV__) {
      console.log("TOKEN:", token);
    }
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    if (__DEV__) {
      console.log("NOTIFICATION:", notification);
      // Alert.alert('got notification', JSON.stringify(notification) ?? "undefined")
    }

    // process the notification
    if (notification.userInteraction && notification.data.action_url) {
      navigate('Home', {
        action_url: notification.data.action_url
      })
      if (__DEV__) {
        Alert.alert('ACTION URL', notification.data.action_url);
      }
    }

    if (!notification.userInteraction) {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.message ?? "",
        channelId: "push-notification-1",
        bigPictureUrl: notification.bigPictureUrl,
        largeIconUrl: notification.bigPictureUrl,
        userInfo: notification.data,
      });
    }

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    if (__DEV__) {
      console.log("ACTION:", notification.action);
    }

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});


export default () => {
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
