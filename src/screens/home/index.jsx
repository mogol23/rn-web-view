import { APP_URL } from '@env';
import CookieManager from '@react-native-cookies/cookies';
import messaging from '@react-native-firebase/messaging';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, BackHandler, Platform, StyleSheet, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { cookies, url } from '../../helpers';
import { globalActions } from '../../redux/actions';
import { webViewLocalStorage } from '../../utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.webView = React.createRef();
    this.state = {
      isReady: false,
      cookiesString: '',
      initScript: webViewLocalStorage.SAVE_FROM_WEB
    };
  }

  static getDerivedStateFromProps(props, state) {
    const allKeys = props.global?.webview ?? [];

    if (allKeys?.length === 0) {
      state = {
        ...state,
        initScript: webViewLocalStorage.SAVE_FROM_WEB
      }
    } else {
      const SAVE_FROM_RN = `(function() {
        ${allKeys.map((n) => `localStorage.setItem(${n.key}, ${n.value});`)}
      })();`;

      state = {
        ...state,
        initScript: SAVE_FROM_RN
      }
    }
    return state;
  }

  async checkFCMToken() {
    const token = await messaging().getToken();
    console.log('fcm token', token)
  }

  componentDidMount() {
    Platform.select({
      default: this.bootAll(),
      android: this.bootAndroid(),
      ios: this.bootiOS(),
    });

    this.checkFCMToken()

    const { global } = this.props;
    try {
      const cookiesString = cookies.toString(global.cookies);
      this.setState({ cookiesString, isReady: true });
    } catch (error) {
      this.setState({ isReady: true })
    }
  }

  async bootAll() {
    await messaging().requestPermission();
    messaging().setBackgroundMessageHandler(async (message) => {
      Alert.alert('new message', JSON.stringify(message));
    })
  }

  async bootAndroid() {
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    await request(PERMISSIONS.ANDROID.CAMERA);
    messaging().onMessage(async (message) => {
      this.showNotification(message.notification);
    })
  }

  async bootiOS() {
    await request(PERMISSIONS.IOS.CAMERA);
    messaging().registerDeviceForRemoteMessages();
  }

  onLoadEnd = async (syntheticEvent) => {
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
      cookies = await CookieManager.get(APP_URL);
    }

    this.setState({ isReady: true });
    globalActions.setState({ cookies });
  };

  refreshHandler = () => {
    setInterval(() => {
      this.webView.current.injectJavaScript(SAVE_FROM_WEB);
    }, 5000);
  };


  onAndroidBackPress = () => {
    if (this.webView.current && this.webView.current.canGoBack) {
      this.webView.current.goBack();
      return true;
    }
    return false;
  }

  showNotification = (notification) => {
    PushNotification.localNotification({
      title: notification.title, message: notification.body ?? "",
    });
  };

  componentWillUnmount() {
    Platform.select({
      android: () => {
        BackHandler.removeEventListener('hardwareBackPress');
      }
    })
  }

  render() {
    const { cookiesString, isReady } = this.state;
    if (!isReady) {
      return null;
    }
    return (
      <WebView
        ref={this.webView}
        source={{
          uri: `${APP_URL}`,
          headers: {
            Cookie: cookiesString,
          },
        }}
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
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        onLoadEnd={this.onLoadEnd.bind(this)}
        style={styles.WebViewStyle}
        onMessage={webViewLocalStorage.handleOnMessage}
        injectedJavaScript={this.state.initScript}
        onNavigationStateChange={(navState) => { this.webView.current.canGoBack = navState.canGoBack; }}
        pullToRefreshEnabled
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  WebViewStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
});

const mapStateToProps = ({ global }) => ({
  global
})

export default connect(mapStateToProps)(App);