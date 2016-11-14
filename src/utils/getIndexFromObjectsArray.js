 var memoizerific = require('memoizerific');
 /**
 * Take item from object array by field name and value
 * @param {array} array - array where u want search field by value
 * @param {string} field - name for search
  @param {} fieldValue - value for search
 * @return {object} item from object array by equal fieldValue
 */
const getIndexFromObjectArray = memoizerific(100)((array, field, fieldValue) => {

  for (const key in array) {
    if (typeof fieldValue === 'function' && fieldValue(array[key][field]) || (array[key][field] === fieldValue)) {
      return parseInt(key, 10);
    }
  }

  return null;

});

export default getIndexFromObjectArray;