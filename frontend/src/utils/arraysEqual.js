/**
 * Recursively compares the values of two objects to determine if they are deeply equal.
 * @param {any} x - The first value to compare.
 * @param {any} y - The second value to compare.
 * @returns {boolean} - True if the values are deeply equal, false otherwise.
 */
function deepCompare(x, y) {
    // If x and y are strictly equal, they are deeply equal
    if (x === y) return true;

    // If x or y is not an object, they cannot be deeply equal
    if (!(x instanceof Object) || !(y instanceof Object)) return false;

    // Get the property names of x and y
    let xProps = Object.getOwnPropertyNames(x);
    let yProps = Object.getOwnPropertyNames(y);

    // If x and y have a different number of properties, they cannot be deeply equal
    if (xProps.length !== yProps.length) return false;

    // Iterate over the properties of x
    for (let i = 0; i < xProps.length; i++) {
        let propName = xProps[i];

        // If y does not have the same property, x and y cannot be deeply equal
        if (!y.hasOwnProperty(propName)) return false;

        // If the values of the property in x and y are not deeply equal, x and y cannot be deeply equal
        if (!deepCompare(x[propName], y[propName])) return false;
    }

    // If all checks pass, x and y are deeply equal
    return true;
}

/**
 * Compares the values of two arrays to determine if they are deeply equal.
 * @param {any[]} array1 - The first array to compare.
 * @param {any[]} array2 - The second array to compare.
 * @returns {boolean} - True if the arrays are deeply equal, false otherwise.
 */
export function arraysEqual(array1, array2) {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
        if (!deepCompare(array1[i], array2[i])) return false;
    }
    return true;
}
