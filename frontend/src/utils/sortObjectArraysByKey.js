/**
 * Sorts an array of objects by a specified key in ascending order. If the key's value is a string, it will be sorted
 * alphabetically. If the key's value is a number, it will be sorted numerically.
 *
 * @param {Array} array - The array to sort.
 * @param {string} key - The key to sort by.
 * @returns {Array} The sorted array.
 */
export const sortMinToMax = (array, key) => {
    if (typeof array[0][key] === 'string') {
        return [...array].sort((a, b) => a[key].localeCompare(b[key]));
    } else {
        return [...array].sort((a, b) => a[key] - b[key]);
    }
};

/**
 * Sorts an array of objects by a specified key in descending order. If the key's value is a string, it will be sorted
 * alphabetically. If the key's value is a number, it will be sorted numerically.
 *
 * @param {Array} array - The array to sort.
 * @param {string} key - The key to sort by.
 * @returns {Array} The sorted array.
 */
export const sortMaxToMin = (array, key) => {
    if (typeof array[0][key] === 'string') {
        return [...array].sort((a, b) => b[key].localeCompare(a[key]));
    } else {
        return [...array].sort((a, b) => b[key] - a[key]);
    }
};

