const db = require("./DB");
/**
 * Returns the number of rows in the journeys table.
 *
 * @async
 * @return {Promise<Object>} - A promise that resolves to an object with a 'count' property
 *                             representing the number of rows in the table.
 *                             If an error occurs, the promise will resolve to null.
 */
exports.getCountOfRows = async () => {
    try{
        let resp;
        const selectTokenQ = `SELECT COUNT(*) as count FROM journeys`;
        resp = await db.makeQuery(selectTokenQ);
        if(resp){
            return resp;
        }

    } catch (e){
        console.log(e);
        return null;
    }
}



/**
 * Retrieves a list of all journeys from the database, paginated.
 * @param {number} pageSize - The number of journeys to return in each page. Default is 10.
 * @param {number} pageNumber - The page number to retrieve. Default is 1.
 * @returns {Promise<*|null>} An array promise of journeys, or null if an error occurred.
 */
exports.getAllJourneys = async (pageSize = 10,pageNumber = 1) => {
    // Calculate the offset based on the page size and number
    const offset = (pageNumber - 1) * pageSize;
    try{
        let resp;
        // Select all journeys from the database, ordered by ID and limited by the page size and offset
        const selectTokenQ = `SELECT * FROM journeys ORDER BY ID ASC LIMIT ? OFFSET ? ;`;
        resp = await db.makeQuery(selectTokenQ, [pageSize, offset]);
        if(resp){
            return resp;
        }

    } catch (e){
        console.log(e);
        return null;
    }
}

/**
 * Retrieves a row from the journeys table with the specified ID.
 *
 * @async
 * @param {number} id - The ID of the row to retrieve.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows in the table.
 *                               If no data is found, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.getJourneyById = async (id) => {
    try{
        let resp;
        const selectTokenQ = `SELECT * FROM journeys where ID = ?`;
        resp = await db.makeQuery(selectTokenQ,id);
        // console.log(resp);
        if(resp.length !==0){
            return resp;
        }
        else{
            throw new Error('No data found')
        }

    } catch (e){
        console.log(e);
        return null;
    }
}


/**
 * Deletes a row from the stations table with the specified ID.
 *
 * @async
 * @param {number} id - The ID of the row to delete.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows that were deleted.
 *                               If no data is deleted, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.deleteJourneyById = async (id) => {
    try{
        let resp;
        const deleteTokenQ = `DELETE FROM journeys where ID = ?`;
        resp = await db.makeQuery(deleteTokenQ,id);

        if(resp.length !==0){
            return resp;
        }
        else{
            throw new Error('No data deleted')
        }

    } catch (e){
        console.log(e);
        return null;
    }
}
