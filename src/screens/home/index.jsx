import { APP_HAS_CAMERA, APP_URL, PUSH_NOTIFICATION_ENABLED, PUSH_NOTIFICATION_STORE_TOKEN_API_URL } from '@env';
import CookieManager from '@react-native-cookies/cookies';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Platform, StyleSheet, View } from 'react-native';
import { Grid } from 'react-native-animated-spinkit';
import { PERMISSIONS, request } from 'react-native-permissions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { cookies as cookiesHelper, url, viewport } from '../../helpers';
import { globalActions } from '../../redux/actions';
import { apiInstance, webViewLocalStorage } from '../../utils';

const App = ({ global: globalProps, ...props }) => {
  const webViewRef = useRef();
  const [initScript, setInitScript] = useState(webViewLocalStorage.SAVE_FROM_WEB);

  useEffect(() => {
    const allKeys = globalProps?.webview ?? [];
    if (allKeys?.length === 0) {
      setInitScript(webViewLocalStorage.SAVE_FROM_WEB);
    } else {
      const SAVE_FROM_RN = `(function() {
        ${allKeys.map((n) => `localStorage.setItem(${n.key}, ${n.value});`)}
      })();`;

      setInitScript(SAVE_FROM_RN);
    }
  }, [globalProps]);


  const checkFCMToken = async () => {
    const token = await messaging().getToken();
    await apiInstance.post(PUSH_NOTIFICATION_STORE_TOKEN_API_URL, {
      fcm_token: token
    }, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': cookiesHelper.toString(globalProps.cookies)
      }
    })
  }

  const bootAll = async () => {
    if (PUSH_NOTIFICATION_ENABLED) {
      await messaging().requestPermission();
      checkFCMToken();
      messaging().setBackgroundMessageHandler(async (message) => {
        Alert.alert('new message', JSON.stringify(message));
      })
    }
    console.log('booted all platform')
  }

  const onAndroidBackPress = () => {
    if (webViewRef.current && webViewRef.current.canGoBack) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }

  const bootAndroid = async () => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    if (APP_HAS_CAMERA) {
      await request(PERMISSIONS.ANDROID.CAMERA);
    }
    if (PUSH_NOTIFICATION_ENABLED) {
      PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids); // ['channel_id_1']
      });
      PushNotification.createChannel(
        {
          channelId: "push-notification-1", // (required)
          channelName: "push-notification-1", // (required)
          // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          // playSound: false, // (optional) default: true
          // soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
      messaging().onMessage(async (message) => {
        showNotification(message.notification);
      })
    }
    console.log('booted for android')
  }

  const bootiOS = async () => {
    if (APP_HAS_CAMERA) {
      await request(PERMISSIONS.IOS.CAMERA);
    }
    if (PUSH_NOTIFICATION_ENABLED) {
      messaging().registerDeviceForRemoteMessages();
    }
    console.log('booted for iOS');
  }

  useEffect(() => {
    bootAll();

    switch (Platform.OS) {
      case 'android':
        bootAndroid()
        break;
      case 'ios':
        bootiOS()
        break;
      default:
        break;
    }

    return () => Platform.select({
      android: () => {
        BackHandler.removeEventListener('hardwareBackPress');
      }
    })
  }, []);

  const onLoadEnd = async (syntheticEvent) => {
    const domain = url.extractSegments(APP_URL)?.[0];
    let cookies;
    if (Platform.OS == 'ios') {
      cookies = await CookieManager.getAll(true).then((res) => {
        const filtered = Object.keys(res).filter(key => {
          return res[key].domain.includes(domain);
        }).reduce((cur, key) => { return Object.assign(cur, { [key]: res[key] }) }, {});
        return filtered
      });
    } else {
      cookies = await CookieManager.get(domain);
    }

    if (PUSH_NOTIFICATION_ENABLED) {
      checkFCMToken();
    }

    globalActions.setState({ cookies });
  };

  const showNotification = (notification) => {
    console.log('got notification', notification);
    Alert.alert('got notification', JSON.stringify(notification) ?? "undefined")
    PushNotification.localNotification({
      title: notification.title, message: notification.body ?? "",
      channelId: "push-notification-1"
    });
  };

  return (
    <WebView
      ref={webViewRef}
      source={{
        uri: `${APP_URL}`,
        headers: {
          Cookie: cookiesHelper.toString(globalProps.cookies),
        },
      }}
      cacheEnabled={true}
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      bounces={false}
      useWebView2
      allowsBackForwardNavigationGestures
      allowFileAccess
      allowsInlineMediaPlayback
      scalesPageToFit
      useWebKit
      sharedCookiesEnabled
      startInLoadingState
      javaScriptEnabled={true}
      domStorageEnabled={true}
      renderLoading={() => (
        <View style={{ width: viewport.width, height: viewport.height, alignItems: 'center', justifyContent: 'center' }}>
          <Grid />
        </View>
      )}
      onLoadEnd={onLoadEnd}
      style={StyleSheet.absoluteFillObject}
      onMessage={webViewLocalStorage.handleOnMessage}
      injectedJavaScript={initScript}
      onNavigationStateChange={(navState) => { webViewRef.current.canGoBack = navState.canGoBack; }}
      pullToRefreshEnabled
      setBuiltInZoomControls={false}
    />
  );
}

const mapStateToProps = ({ global }) => ({
  global
})

export default connect(mapStateToProps)(App);
