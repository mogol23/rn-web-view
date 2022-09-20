import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { request, PERMISSIONS } from 'react-native-permissions';
import CookieManager from '@react-native-cookies/cookies';
import { connect } from 'react-redux';
import { APP_URL } from '@env';
import { globalActions } from '../../redux/actions';
import { url, cookies } from '../../helpers';
import { webViewLocalStorage } from '../../utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.myWebView = React.createRef();
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

  async componentDidMount() {
    await request(PERMISSIONS.ANDROID.CAMERA);

    const { global } = this.props;
    try {
      const cookiesString = cookies.toString(global.cookies);
      this.setState({ cookiesString, isReady: true });
    } catch (error) {
      this.setState({ isReady: true })
    }
  }

  onLoadEnd = async (syntheticEvent) => {
    const domain = url.extractSegments(APP_URL)?.[0];
    let cookies;
    if(Platform.OS == 'ios'){
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
      this.myWebView.current.injectJavaScript(SAVE_FROM_WEB);
    }, 5000);
  };

  render() {
    const { cookiesString, isReady } = this.state;
    if (!isReady) {
      return null;
    }
    return (
      <WebView
        ref={this.myWebView}
        source={{
          uri: `${APP_URL}`,
          headers: {
            Cookie: cookiesString,
          },
        }}
        onLoadEnd={this.onLoadEnd.bind(this)}
        allowsBackForwardNavigationGestures
        allowFileAccess
        allowsInlineMediaPlayback
        scalesPageToFit
        useWebKit
        sharedCookiesEnabled
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.WebViewStyle}
        onMessage={webViewLocalStorage.handleOnMessage}
        injectedJavaScript={this.state.initScript}
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