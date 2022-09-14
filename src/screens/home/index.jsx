import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import { connect } from 'react-redux';
import { APP_URL } from '@env';
import { globalActions } from '../../redux/actions';
import {  url, cookies } from '../../helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.myWebView = React.createRef();
    this.state = {
      isReady: false,
      cookiesString: '',
    };
  }

  componentDidMount() {
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
    const cookies = await CookieManager.getAll(true).then((res) => {
      const filtered = Object.keys(res).filter(key => {
        return res[key].domain.includes(domain);
      }).reduce((cur, key) => { return Object.assign(cur, { [key]: res[key] }) }, {});
      return filtered
    });

    this.setState({ isReady: true });
    globalActions.setState({ cookies });
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