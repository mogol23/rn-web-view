import {
  APP_HAS_CAMERA,
  APP_URL,
  PUSH_NOTIFICATION_ENABLED,
  PUSH_NOTIFICATION_STORE_TOKEN_API_URL,
} from '@env';
import {getMessaging, getToken} from '@react-native-firebase/messaging';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {cookies as cookiesHelper, url, viewport} from '../../helpers';
import {bootstrapPushNotifications} from '../../helpers/notifications';
import {globalActions} from '../../redux/actions';
import {apiInstance, webViewLocalStorage} from '../../utils';

const App = ({global: globalProps, route}) => {
  const webViewRef = useRef(null);
  const [tempUrl, setTempUrl] = useState();
  const [currentUrl, setCurrentUrl] = useState(APP_URL);
  const [cookiesReady, setCookiesReady] = useState(false);

  const activeUrl = tempUrl ?? APP_URL;
  const activeOrigin = url.extractOrigin(activeUrl);

  const beforeContentScript = useMemo(() => {
    const entries = webViewLocalStorage.entriesForOrigin(
      globalProps?.webviewStorage,
      activeOrigin,
    );
    return webViewLocalStorage.buildRestoreScript(entries);
  }, [globalProps?.webviewStorage, activeOrigin]);

  useEffect(() => {
    if (route.params?.action_url) {
      setTempUrl(route.params.action_url);
    } else {
      setTempUrl(undefined);
    }
  }, [route.params]);

  useEffect(() => {
    let cancelled = false;
    setCookiesReady(false);
    (async () => {
      try {
        const jar = globalActions.getState()?.cookieJar;
        await cookiesHelper.restoreJarForUrl(jar, activeUrl);
      } catch (error) {
        if (__DEV__) {
          console.warn('cookie restore failed', error);
        }
      } finally {
        if (!cancelled) {
          setCookiesReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeUrl]);

  const checkFCMToken = async () => {
    if (PUSH_NOTIFICATION_ENABLED !== 'true') {
      return;
    }
    try {
      const token = await getToken(getMessaging());
      const hostname = url.extractHostname(APP_URL);
      const cookieHeader = cookiesHelper.toHeaderString(
        cookiesHelper.cookiesForHostname(globalProps?.cookieJar, hostname),
      );
      await apiInstance.post(
        PUSH_NOTIFICATION_STORE_TOKEN_API_URL,
        {fcm_token: token},
        {
          withCredentials: false,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(cookieHeader ? {Cookie: cookieHeader} : {}),
          },
        },
      );
    } catch (error) {
      if (__DEV__) {
        console.warn('store FCM token failed', error);
      }
    }
  };

  const cameraEnabled = APP_HAS_CAMERA === 'true';

  const requestCameraAccess = async () => {
    if (!cameraEnabled) {
      return;
    }
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]
        : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO];
    await requestMultiple(permissions);
  };

  useEffect(() => {
    const boot = async () => {
      await requestCameraAccess();
      if (PUSH_NOTIFICATION_ENABLED === 'true') {
        await bootstrapPushNotifications();
        await checkFCMToken();
      }
    };
    boot();

    const onAndroidBackPress = () => {
      if (webViewRef.current?.canGoBack) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      onAndroidBackPress,
    );
    return () => sub.remove();
  }, []);

  const onLoadEnd = async () => {
    try {
      const {hostname, cookies} = await cookiesHelper.readCookiesForUrl(
        currentUrl || activeUrl,
      );
      if (hostname && Object.keys(cookies).length > 0) {
        globalActions.setState({
          cookieJar: cookiesHelper.mergeDomainCookies(
            globalProps?.cookieJar,
            hostname,
            cookies,
          ),
        });
      }
    } catch (error) {
      if (__DEV__) {
        console.warn('cookie read failed', error);
      }
    }

    if (PUSH_NOTIFICATION_ENABLED === 'true') {
      checkFCMToken();
    }

    webViewRef.current?.injectJavaScript(
      webViewLocalStorage.DOCUMENT_COOKIE_SCRIPT,
    );
  };

  const onPermissionRequest = request => {
    const resources = request?.nativeEvent?.resources ?? request?.resources ?? [];
    if (cameraEnabled) {
      if (typeof request?.grant === 'function') {
        request.grant(resources);
      } else {
        request?.nativeEvent?.grant?.(resources);
      }
      return;
    }
    if (typeof request?.deny === 'function') {
      request.deny();
    } else {
      request?.nativeEvent?.deny?.();
    }
  };

  if (!cookiesReady) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      ref={webViewRef}
      source={{uri: activeUrl}}
      cacheEnabled
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      bounces={false}
      allowsBackForwardNavigationGestures
      allowFileAccess
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      mediaCapturePermissionGrantType={cameraEnabled ? 'grant' : 'deny'}
      scalesPageToFit
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      startInLoadingState
      javaScriptEnabled
      domStorageEnabled
      onPermissionRequest={onPermissionRequest}
      renderLoading={() => (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      onLoadEnd={onLoadEnd}
      style={[StyleSheet.absoluteFillObject, {marginTop: 30}]}
      onMessage={webViewLocalStorage.handleOnMessage}
      injectedJavaScriptBeforeContentLoaded={beforeContentScript}
      onNavigationStateChange={navState => {
        if (webViewRef.current) {
          webViewRef.current.canGoBack = navState.canGoBack;
        }
        setCurrentUrl(navState.url);
      }}
      pullToRefreshEnabled
      setBuiltInZoomControls={false}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    width: viewport.width,
    height: viewport.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({global}) => ({
  global,
});

export default connect(mapStateToProps)(App);
