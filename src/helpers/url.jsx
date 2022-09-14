function extractSegments(str) {
  return str.split('/').filter(x => x.length > 0)?.slice(1);
}

export default {
  extractSegments
};
