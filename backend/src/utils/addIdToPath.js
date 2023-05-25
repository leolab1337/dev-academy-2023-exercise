/**
 * Adds an ID to a path.
 *
 * @param {string} path - The base path.
 * @param {string} id - The ID to be added.
 * @returns {string} The new path with the ID.
 *
 * @example
 * const basePath = '/users';
 * const userId = '12345';
 * const newPath = addIdToPath(basePath, userId);
 * console.log(newPath); // Output: /users/12345
 */
function addIdToPath(path, id) {
    if (path.endsWith('/')) {
        // Remove trailing slash if exists
        path = path.slice(0, -1);
    }

    return path + '/' + id;
}

module.exports = addIdToPath;
