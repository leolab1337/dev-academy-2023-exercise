/**
 * Determines if a given value is a string representation of a date
 * @param {any} value - The value to check
 * @returns {boolean} - A boolean indicating whether or not the value is a string representation of a date
 */
export function isDateString(value) {
    return typeof value === 'string' && !isNaN(Date.parse(value));
}
