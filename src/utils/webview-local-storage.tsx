import {WebViewMessageEvent} from 'react-native-webview';
import {globalActions} from '../redux/actions';

export enum MessageTypes {
  save = 'webview/save',
  remove = 'webview/remove',
  clear = 'webview/clear',
}

export type StorageEntry = {
  origin: string;
  key: string;
  value: string;
};

type Message =
  | {type: MessageTypes.save; payload: StorageEntry[]}
  | {type: MessageTypes.remove; payload: {origin: string; key: string}}
  | {type: MessageTypes.clear; payload: {origin: string}};

function entriesForOrigin(
  all: StorageEntry[] | undefined,
  origin: string | null,
): StorageEntry[] {
  if (!origin || !all?.length) {
    return [];
  }
  return all.filter(entry => entry.origin === origin);
}

/** Restore persisted keys before page JS runs; values are JSON-escaped. */
export function buildRestoreScript(entries: StorageEntry[]): string {
  if (!entries.length) {
    return buildBridgeScript();
  }
  const assignments = entries
    .map(
      entry =>
        `try{localStorage.setItem(${JSON.stringify(entry.key)},${JSON.stringify(
          entry.value,
        )});}catch(e){}`,
    )
    .join('');
  return `(function(){${assignments}${bridgeBody()}})();`;
}

function bridgeBody(): string {
  return `
var __rnOrigin = window.location.origin;
function __rnPost(type, payload) {
  try {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: type, payload: payload}));
  } catch (e) {}
}
function __rnSnapshot() {
  var values = [];
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      values.push({origin: __rnOrigin, key: key, value: localStorage.getItem(key)});
    }
  } catch (e) {}
  __rnPost('webview/save', values);
}
(function wrapStorage() {
  var setItem = localStorage.setItem.bind(localStorage);
  var removeItem = localStorage.removeItem.bind(localStorage);
  var clear = localStorage.clear.bind(localStorage);
  localStorage.setItem = function(key, value) {
    setItem(key, value);
    __rnSnapshot();
  };
  localStorage.removeItem = function(key) {
    removeItem(key);
    __rnPost('webview/remove', {origin: __rnOrigin, key: key});
  };
  localStorage.clear = function() {
    clear();
    __rnPost('webview/clear', {origin: __rnOrigin});
  };
})();
__rnSnapshot();
`;
}

export function buildBridgeScript(): string {
  return `(function(){${bridgeBody()}})();`;
}

/** Optional document.cookie snapshot as a secondary path for non-httpOnly cookies. */
export const DOCUMENT_COOKIE_SCRIPT = `(function(){
  try {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'webview/document-cookie',
      payload: {origin: window.location.origin, cookie: document.cookie || ''}
    }));
  } catch (e) {}
})();`;

export function handleOnMessage(event: WebViewMessageEvent) {
  let message: Message | {type: string; payload: any};
  try {
    message = JSON.parse(event.nativeEvent.data);
  } catch {
    return;
  }

  const state = globalActions.getState() || {};
  const current: StorageEntry[] = state.webviewStorage || [];

  switch (message.type) {
    case MessageTypes.save: {
      const incoming = (message.payload || []) as StorageEntry[];
      if (!incoming.length) {
        return;
      }
      const origin = incoming[0]?.origin;
      if (!origin) {
        return;
      }
      const withoutOrigin = current.filter(entry => entry.origin !== origin);
      globalActions.setState({
        webviewStorage: [...withoutOrigin, ...incoming],
      });
      break;
    }
    case MessageTypes.remove: {
      const {origin, key} = message.payload || {};
      globalActions.setState({
        webviewStorage: current.filter(
          entry => !(entry.origin === origin && entry.key === key),
        ),
      });
      break;
    }
    case MessageTypes.clear: {
      const {origin} = message.payload || {};
      globalActions.setState({
        webviewStorage: current.filter(entry => entry.origin !== origin),
      });
      break;
    }
    default:
      break;
  }
}

export default {
  MessageTypes,
  buildRestoreScript,
  buildBridgeScript,
  DOCUMENT_COOKIE_SCRIPT,
  handleOnMessage,
  entriesForOrigin,
};
