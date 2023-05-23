const db = require("./DB");
const tableName = "journeys";

/**
 * Returns the number of rows in the journeys table.
 *
 * @async
 * @return {Promise<Object>} - A promise that resolves to an object with a 'count' property
 *                             representing the number of rows in the table.
 *                             If an error occurs, the promise will resolve to null.
 */
exports.getCountOfRows = db.createGetCountOfRows(tableName)

/**
 * Retrieves a list of all journeys from the database, paginated.
 * @param {number} pageSize - The number of journeys to return in each page. Default is 10.
 * @param {number} pageNumber - The page number to retrieve. Default is 1.
 * @returns {Promise<*|null>} An array promise of journeys, or null if an error occurred.
 */
exports.getAll = db.createGetAll(tableName);


/**
 * Retrieves a row from the journeys table with the specified ID.
 *
 * @async
 * @param {number} id - The ID of the row to retrieve.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows in the table.
 *                               If no data is found, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.getById = db.createGetByParam(tableName,"ID");


/**
 * Deletes a row from the stations table with the specified ID.
 *
 * @async
 * @param {number} id - The ID of the row to delete.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows that were deleted.
 *                               If no data is deleted, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.deleteById = db.createDeleteByParam(tableName,"ID");

