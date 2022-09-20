
import { WebViewMessageEvent } from 'react-native-webview';
import { globalActions } from '../redux/actions';


export enum MessageTypes {
  save = 'webview/save',
}

export const SAVE_FROM_WEB = `(function() {
  var values = [],
  keys = Object.keys(localStorage),
  i = keys.length;

  while ( i-- ) {
      values.push({key: keys[i], value: localStorage.getItem(keys[i])});
  }
  window.ReactNativeWebView.postMessage(JSON.stringify({type: 'webview/save', payload: values}));
})();`;

interface Message {
  type: MessageTypes;
  payload: any;
}

interface SaveData {
  key: string;
  value: string;
}

export function handleOnMessage(event: WebViewMessageEvent) {
  const message : Message = JSON.parse(event.nativeEvent.data);
  switch (message.type) {
    case MessageTypes.save: {
      const data : Array<SaveData> = message.payload;
      globalActions.setState({webview: data});
      break;
    }
    default:
      throw new Error('invalid case');
  }
}

export default {
  MessageTypes, SAVE_FROM_WEB, handleOnMessage
}