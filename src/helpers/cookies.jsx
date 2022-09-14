export const toString = (json) => {
  let cookiesString = '';
  for (let [key, value] of Object.entries(json)) {
    cookiesString += `${key}=${value.value}; `;
  }
  return cookiesString;
};

export default {
  toString
}