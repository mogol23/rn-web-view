function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function toArray(json) {
  return Object.keys(json).map(key => ({[key]: json[key]}));
}

export default {
  isJsonString,
  toArray
};
