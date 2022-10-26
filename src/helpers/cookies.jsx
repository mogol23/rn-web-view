export const toString = (json) => {
  if(!json) return null;
  let cookiesString = '';
  for (let [key, value] of Object.entries(json)) {
    cookiesString += `${key}=${value.value}; `;
  }
  return cookiesString;
};

export default {
  toString
}