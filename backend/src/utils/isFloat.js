/**
 * Determines if a string value represents a float.
 *
 * @param {string} n - The value to check.
 *
 * @returns {boolean} - True if the value represents a float, false if it does not.
 */
const isStringNumberFloat = (n) =>{
   if(typeof(n) === "string"){
       return  n.includes('.');
   }
   else{
       return false;
   }
}

/**
 * Determines if a value is a float.
 *
 * @param {number} n - The value to check.
 *
 * @returns {boolean} - True if the value is a float, false if it is not.
 */
const isNumberFloat = (n) => Number(n) === n && n % 1 !== 0;

module.exports = {
    isStringNumberFloat,
    isNumberFloat
}
