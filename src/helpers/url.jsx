function extractHostname(value) {
  if (!value) {
    return null;
  }
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).hostname;
  } catch {
    return null;
  }
}

function extractOrigin(value) {
  if (!value) {
    return null;
  }
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const parsed = new URL(withProtocol);
    return parsed.origin;
  } catch {
    return null;
  }
}

/** Legacy helper kept for callers that split APP_URL path segments. */
function extractSegments(str) {
  return str.split('/').filter(x => x.length > 0)?.slice(1);
}

function cookieMatchesHostname(cookieDomain, hostname) {
  if (!cookieDomain || !hostname) {
    return false;
  }
  const normalized = cookieDomain.replace(/^\./, '').toLowerCase();
  const host = hostname.toLowerCase();
  return host === normalized || host.endsWith(`.${normalized}`);
}

export default {
  extractHostname,
  extractOrigin,
  extractSegments,
  cookieMatchesHostname,
};
