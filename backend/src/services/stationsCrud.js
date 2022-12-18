const db = require('./DB');

/**
 *
 * @returns {Promise<object|null>}
 */
exports.getAllStations = async () => {
    try{
        let resp;
        const selectTokenQ = `SELECT * FROM stations order by ID;`;
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

