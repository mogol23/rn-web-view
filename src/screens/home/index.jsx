import {
  APP_HAS_CAMERA,
  APP_URL,
  PUSH_NOTIFICATION_ENABLED,
  PUSH_NOTIFICATION_STORE_TOKEN_API_URL,
} from '@env';
import CookieManager from '@react-native-cookies/cookies';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import { Grid } from 'react-native-animated-spinkit';
import { PERMISSIONS, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { cookies as cookiesHelper, url, viewport } from '../../helpers';
import { globalActions } from '../../redux/actions';
import { apiInstance, webViewLocalStorage } from '../../utils';

const App = ({ global: globalProps, route, ...props }) => {
  const [tempUrl, setTempUrl] = useState();
  const webViewRef = useRef();
  const [initScript, setInitScript] = useState(
    webViewLocalStorage.SAVE_FROM_WEB,
  );
  const [currentUrl, setCurrentUrl] = useState();
  useEffect(() => {
    const allKeys = globalProps?.webview ?? [];
    if (allKeys?.length === 0) {
      setInitScript(webViewLocalStorage.SAVE_FROM_WEB);
    } else {
      const SAVE_FROM_RN = `(function() {
        ${allKeys.map(n => `localStorage.setItem(${n.key}, ${n.value});`)}
      })();`;

      setInitScript(SAVE_FROM_RN);
    }
  }, [globalProps]);

  useEffect(() => {
    if (route.params?.action_url) {
      setTempUrl(route.params.action_url);
    } else {
      setTempUrl(undefined);
    }
  }, [route.params]);

  const checkFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('cookie', cookiesHelper.toString(globalProps.cookies));
    await apiInstance.post(
      PUSH_NOTIFICATION_STORE_TOKEN_API_URL,
      {
        fcm_token: token,
      },
      {
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: cookiesHelper.toString(globalProps.cookies),
        },
      },
    );
  };

  const bootAll = async () => {
    if (PUSH_NOTIFICATION_ENABLED) {
      PushNotification.popInitialNotification();
      PushNotification.requestPermissions(['alert', 'badge', 'sound']);
      // PushNotification.checkPermissions((res) => console.log('notif permission', res)) //Check permissions
      await messaging().getInitialNotification();
      messaging().requestPermission();
      await checkFCMToken();
    }
    console.log('booted all platform');

    switch (Platform.OS) {
      case 'android':
        await bootAndroid();
        break;
      case 'ios':
        await bootiOS();
        break;
      default:
        break;
    }
  };

  const onAndroidBackPress = () => {
    if (webViewRef.current && webViewRef.current.canGoBack) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const bootAndroid = async () => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    if (APP_HAS_CAMERA) {
      await request(PERMISSIONS.ANDROID.CAMERA);
    }
    if (PUSH_NOTIFICATION_ENABLED) {
      PushNotification.createChannel(
        {
          channelId: 'push-notification-1', // (required)
          channelName: 'push-notification-1', // (required)
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
    console.log('booted for android');
  };

  const bootiOS = async () => {
    if (APP_HAS_CAMERA) {
      await request(PERMISSIONS.IOS.CAMERA);
    }
    if (PUSH_NOTIFICATION_ENABLED) {
      messaging().registerDeviceForRemoteMessages();
    }
    console.log('booted for iOS');
  };

  useEffect(() => {
    bootAll();
    return () =>
      Platform.select({
        android: () => {
          BackHandler.removeEventListener('hardwareBackPress');
        },
      });
  }, []);

  const onLoadEnd = async syntheticEvent => {
    const domain = url.extractSegments(APP_URL)?.[0];
    let cookies;
    console.log('current url', currentUrl);
    console.log('domain', domain);
    if (Platform.OS == 'ios') {
      cookies = await CookieManager.getAll(true).then(res => {
        console.log('cookies', res);
        const filtered = Object.keys(res)
          .filter(key => {
            return res[key].domain.includes(domain);
          })
          .reduce((cur, key) => {
            return Object.assign(cur, { [key]: res[key] });
          }, {});
        return filtered;
      });
    } else {
      cookies = await CookieManager.get(domain);
      console.log('cookies', cookies);
    }

    if (PUSH_NOTIFICATION_ENABLED) {
      checkFCMToken();
    }

    globalActions.setState({ cookies });
  };

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{
          uri: `${tempUrl ?? APP_URL}`,
          headers: {
            Cookie: globalProps.cookies
              ? cookiesHelper.toString(globalProps.cookies)
              : '',
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
        sharedCookiesEnabled={false}
        thirdPartyCookiesEnabled={true}
        startInLoadingState
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={() => (
          <View
            style={{
              width: viewport.width,
              height: viewport.height,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Grid />
          </View>
        )}
        onLoadEnd={onLoadEnd}
        style={StyleSheet.absoluteFillObject}
        onMessage={webViewLocalStorage.handleOnMessage}
        injectedJavaScript={initScript}
        onNavigationStateChange={navState => {
          webViewRef.current.canGoBack = navState.canGoBack;
          setCurrentUrl(navState.url);
        }}
        pullToRefreshEnabled
        setBuiltInZoomControls={false}
      />
    </>
  );
};

const mapStateToProps = ({ global }) => ({
  global,
});

export default connect(mapStateToProps)(App);
