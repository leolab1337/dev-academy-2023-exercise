/**
 * Constructs a URL by adding parameters to the base string.
 *
 * @param {string} baseString - The base URL string.
 * @param {Object} params - The parameters to be added to the URL.
 * @returns {string} The complete URL with added parameters.
 *
 * @example
 * const baseURL = 'https://api.example.com/data';
 * const parameters = {
 *   key: 'API_KEY',
 *   page: 2,
 *   limit: 10
 * };
 *
 * const urlWithParams = addParams(baseURL, parameters);
 * console.log(urlWithParams);
 * // Output: https://api.example.com/data?key=API_KEY&page=2&limit=10
 */
function addParams(baseString, params) {
    let paramString = '';

    if(!Object.keys(params).length) return baseString;

    // Check if the baseString already contains query parameters
    const hasQueryParams = baseString.includes('?');

    // Loop through the params object and construct the parameter string
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            paramString += `${key}=${params[key]}&`;
        }
    }

    // Remove the trailing '&' character
    paramString = paramString.slice(0, -1);

    // Construct the final URL
    if (hasQueryParams) {
        return `${baseString}&${paramString}`;
    } else {
        return `${baseString}?${paramString}`;
    }
}

module.exports = addParams;

