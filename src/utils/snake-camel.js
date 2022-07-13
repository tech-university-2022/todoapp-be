/* eslint-disable no-empty */
const _ = require('lodash');

function snakeToCamelObject(obj) {
  try {
    const jsonString = typeof obj === 'string' ? obj : JSON.stringify(obj);
    // variable has length greater 100 will be ignored
    const newJsonString = jsonString.replace(/"[a-zA-Z0-9_]{1,100}":/g, (match) => {
      const variableName = match.slice(1, match.length - 2);
      return `"${_.camelCase(variableName)}":`;
    });
    return JSON.parse(newJsonString);
  } catch (_err) {}
  return obj;
}

function camelToSnakeObject(obj) {
  try {
    const jsonString = typeof obj === 'string' ? obj : JSON.stringify(obj);
    // variable has length greater 100 will be ignored
    const newJsonString = jsonString.replace(/"[a-zA-Z0-9_]{1,100}":/g, (match) => {
      const variableName = match.slice(1, match.length - 2);
      return `"${_.snakeCase(variableName)}":`;
    });
    return JSON.parse(newJsonString);
  } catch (_err) {}
  return obj;
}

module.exports = {
  snakeToCamelObject,
  camelToSnakeObject,
};
