const db = require('./DB');




exports.getCountOfRows = async () => {

    try{
        let resp;
        const selectTokenQ = `SELECT COUNT(*) as count FROM stations`;
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
 * Retrieves a list of all stations from the database, paginated.
 * @param {number} pageSize - The number of stations to return in each page. Default is 10.
 * @param {number} pageNumber - The page number to retrieve. Default is 1.
 * @returns {Promise<*|null>} An array promise of stations, or null if an error occurred.
 */
exports.getAllStations = async (pageSize = 10,pageNumber = 1) => {
    // Calculate the offset based on the page size and number
    const offset = (pageNumber - 1) * pageSize;
    try{
        let resp;
        // Select all stations from the database, ordered by ID and limited by the page size and offset
        const selectTokenQ = `SELECT * FROM stations ORDER BY ID ASC LIMIT ? OFFSET ? ;`;
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
 *
 * @param jsonObject{object}
 * @returns {Promise<object|null>}
 */
exports.postNewStation = async (jsonObject) => {

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

    if(Number.isInteger(lastTableIndex)){
        objectToSave.FID = lastTableIndex + 1;
        for (const [key, value] of Object.entries(jsonObject)) {
            objectToSave[key] = value;
        }
    }
    try{
        if(objectToSave.FID){
            let resp;
            const values = Object.values(objectToSave);
            const createRequestQ = `INSERT INTO stations (FID,ID,Nimi,Namn,Name,Osoite,Address,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            resp = await db.makeQuery(createRequestQ,values);
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
 * Todo update stations service
 */


/**
 *
 * @param id{number}
 * @returns {Promise<object|null>}
 */
exports.getStationById = async (id) => {
    try{
        let resp;
        const selectTokenQ = `SELECT * FROM stations where ID = ?`;
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
 *
 * @param id{number}
 * @returns {Promise<object|null>}
 */
exports.deleteStationById = async (id) => {
    try{
        let resp;
        const deleteTokenQ = `DELETE FROM stations where ID = ?`;
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


/**
 *
 * @param FID{number}
 * @returns {Promise<object|null>}
 */
exports.deleteStationByFid = async (FID) => {
    try{
        let resp;
        const deleteTokenQ = `DELETE FROM stations where FID = ?`;
        resp = await db.makeQuery(deleteTokenQ,FID);

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


/**
 *
 * @param FID{number}
 * @returns {Promise<object|null>}
 */
exports.getStationByFId = async (FID) => {
    try{
        let resp;
        const selectTokenQ = `SELECT * FROM stations where FID = ?`;
        resp = await db.makeQuery(selectTokenQ,FID);
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

