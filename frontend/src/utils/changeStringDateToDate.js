import {isDateString} from "./isDateString";

/**
 * Transforms the date strings in the object into a more readable format
 * @param {Object} object - An object containing date strings as values
 * @returns {Object} An object with the modified date strings
 */
export const changeStringDateToDate = (object)=> {
        const modifiedRow = {};
        for (let [key, value] of Object.entries(object)) {
            if (isDateString(value)) {
                const date = new Date(value);
                // Assign the modified value to the new object
                modifiedRow[key] = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
            } else {
                // Assign the original value to the new object
                modifiedRow[key] = value;
            }
        }
        // Return the modified object
        return modifiedRow;
    }

