const db = require('./DB');
const tableName = "stations";

/**
 * Returns the number of rows in the stations table.
 *
 * @async
 * @return {Promise<Object>} - A promise that resolves to an object with a 'count' property
 *                             representing the number of rows in the table.
 *                             If an error occurs, the promise will resolve to null.
 */
exports.getCountOfRows = db.createGetCountOfRows(tableName)


/**
 * Retrieves a list of all stations from the database, paginated.
 * @param {number} pageSize - The number of stations to return in each page. Default is 10.
 * @param {number} pageNumber - The page number to retrieve. Default is 1.
 * @returns {Promise<*|null>} An array promise of stations, or null if an error occurred.
 */
exports.getAll = db.createGetAll(tableName);

/**
 * Inserts a new row into the stations table with the provided data.
 *
 * @async
 * @param {Object} jsonObject - An object containing the data to be inserted into the table.
 * @return {Promise<Object>} - A promise that resolves to the result of the SQL query.
 *                             If an error occurs, the promise will resolve to null.
 */
exports.postNew = async (jsonObject) => {

    const objectToSave = {
        "FID" : null,
        "ID" : 0,
        "Nimi" : '',
        "Namn" : '',
        "Name" : '',
        "Osoite": '',
        "Address": '',
        "Kaupunki" : '',
        "Stad": '',
        "Operaattor" : '',
        "Kapasiteet" : 0,
        "x" : 0,
        "y" : 0
    }

    let lastTableIndex;
    const lastTableQ = `SELECT MAX(FID) FROM stations;`
    const queryResult = await db.makeQuery(lastTableQ);
    lastTableIndex = await queryResult[0]['MAX(FID)'];
    const insertIntoTable = db.createInsertIntoTable(tableName);

    if(Number.isInteger(lastTableIndex)){
        objectToSave.FID = lastTableIndex + 1;
        for (const [key, value] of Object.entries(jsonObject)) {
            objectToSave[key] = value;
        }
    }
    try{
        if(objectToSave.FID){
            let resp;
            resp = await insertIntoTable(objectToSave);
            // const values = Object.values(objectToSave);
            // const createRequestQ = `INSERT INTO stations (FID,ID,Nimi,Namn,Name,Osoite,Address,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            // resp = await db.makeQuery(createRequestQ,values);
            if(resp){
                return resp;
            }
            else{
                throw new Error('Bad request');
            }
        }
        else {
            throw new Error('Json object doesnt have the FID field');
        }

    } catch (e){
        console.log(e);
        return null;
    }
}




/**
 * Retrieves a row from the stations table with the specified ID.
 *
 * @async
 * @param {number} id - The ID of the row to retrieve.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows in the table.
 *                               If no data is found, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.getById = db.createGetByParam(tableName,"ID");



/**
 * Retrieves a row from the stations table with the specified FID.
 *
 * @async
 * @param {number} FID - The FID of the row to retrieve.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows in the table.
 *                               If no data is found, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.getByFid = db.createGetByParam(tableName,"FID");


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


/**
 * Deletes a row from the stations table with the specified FID.
 *
 * @async
 * @param {number} FID - The FID of the row to delete.
 * @return {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows that were deleted.
 *                               If no data is deleted, the promise will reject with an error.
 *                               If an error occurs, the promise will resolve to null.
 */
exports.deleteByFid = db.createDeleteByParam(tableName,"FID");



