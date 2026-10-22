import CookieManager from '@react-native-cookies/cookies';
import {Platform} from 'react-native';
import url from './url';

const useWebKit = Platform.OS === 'ios';

function toHeaderString(cookieMap) {
  if (!cookieMap) {
    return '';
  }
  return Object.values(cookieMap)
    .filter(cookie => cookie?.name && cookie?.value != null)
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

function cookiesForHostname(jarByDomain, hostname) {
  if (!jarByDomain || !hostname) {
    return {};
  }
  const merged = {};
  Object.entries(jarByDomain).forEach(([domain, cookies]) => {
    if (!url.cookieMatchesHostname(domain, hostname)) {
      return;
    }
    Object.entries(cookies || {}).forEach(([name, cookie]) => {
      merged[name] = cookie;
    });
  });
  return merged;
}

async function readCookiesForUrl(pageUrl) {
  const hostname = url.extractHostname(pageUrl);
  if (!hostname) {
    return {hostname: null, cookies: {}};
  }

  if (Platform.OS === 'ios') {
    const all = await CookieManager.getAll(useWebKit);
    const cookies = {};
    Object.values(all || {}).forEach(cookie => {
      if (url.cookieMatchesHostname(cookie.domain, hostname)) {
        cookies[cookie.name] = cookie;
      }
    });
    return {hostname, cookies};
  }

  const origin = url.extractOrigin(pageUrl) || `https://${hostname}`;
  const cookies = (await CookieManager.get(origin, useWebKit)) || {};
  return {hostname, cookies};
}

async function writeCookies(cookies) {
  const list = Object.values(cookies || {}).filter(Boolean);
  for (const cookie of list) {
    if (!cookie?.name || cookie.value == null) {
      continue;
    }
    const domain = (cookie.domain || '').replace(/^\./, '');
    const cookieUrl =
      cookie.origin ||
      `${cookie.secure === false ? 'http' : 'https'}://${domain || 'localhost'}${
        cookie.path || '/'
      }`;
    await CookieManager.set(cookieUrl, cookie, useWebKit);
  }
  if (Platform.OS === 'android') {
    await CookieManager.flush();
  }
}

async function restoreJarForUrl(jarByDomain, pageUrl) {
  const hostname = url.extractHostname(pageUrl);
  if (!hostname || !jarByDomain) {
    return;
  }
  const matching = cookiesForHostname(jarByDomain, hostname);
  await writeCookies(matching);
}

function mergeDomainCookies(existingJar, hostname, nextCookies) {
  if (!hostname) {
    return existingJar || {};
  }
  if (!nextCookies || Object.keys(nextCookies).length === 0) {
    // Empty/error reads must not wipe a previously persisted jar.
    return existingJar || {};
  }
  return {
    ...(existingJar || {}),
    [hostname]: {
      ...((existingJar || {})[hostname] || {}),
      ...nextCookies,
    },
  };
}

export default {
  toString: toHeaderString,
  toHeaderString,
  cookiesForHostname,
  readCookiesForUrl,
  writeCookies,
  restoreJarForUrl,
  mergeDomainCookies,
};
