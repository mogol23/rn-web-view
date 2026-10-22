import notifee, {
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {navigate} from '../navigations/hooks';

export const NOTIFICATION_CHANNEL_ID = 'push-notification-sound';

/**
 * FCM payload contract for background/killed sound:
 * - android.notification.sound = "default"
 * - android.notification.channel_id = "push-notification-sound"
 * - apns.payload.aps.sound = "default"
 * - data.action_url optional deep link into the WebView
 */

export async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') {
    return;
  }
  await notifee.createChannel({
    id: NOTIFICATION_CHANNEL_ID,
    name: 'Push notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });
}

export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const authStatus = await messaging().requestPermission({
    alert: true,
    badge: true,
    sound: true,
  });
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

export function openFromNotificationData(data) {
  const actionUrl = data?.action_url;
  if (actionUrl) {
    navigate('Home', {action_url: actionUrl});
  }
}

export async function displayRemoteMessage(remoteMessage) {
  const title =
    remoteMessage?.notification?.title ||
    remoteMessage?.data?.title ||
    'Notification';
  const body =
    remoteMessage?.notification?.body ||
    remoteMessage?.data?.body ||
    remoteMessage?.data?.message ||
    '';

  await ensureAndroidChannel();
  await notifee.displayNotification({
    title,
    body,
    data: remoteMessage?.data || {},
    android: {
      channelId: NOTIFICATION_CHANNEL_ID,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
      sound: 'default',
      importance: AndroidImportance.HIGH,
    },
    ios: {
      sound: 'default',
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
  });
}

export function registerNotificationOpenHandlers() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    openFromNotificationData(remoteMessage?.data);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage?.data) {
        openFromNotificationData(remoteMessage.data);
      }
    });

  return notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS) {
      openFromNotificationData(detail?.notification?.data);
    }
  });
}

export async function bootstrapPushNotifications() {
  await ensureAndroidChannel();
  await requestNotificationPermission();
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
  }
}

export default {
  NOTIFICATION_CHANNEL_ID,
  ensureAndroidChannel,
  requestNotificationPermission,
  openFromNotificationData,
  displayRemoteMessage,
  registerNotificationOpenHandlers,
  bootstrapPushNotifications,
};
