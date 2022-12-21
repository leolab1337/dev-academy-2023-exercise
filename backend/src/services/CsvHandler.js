const logUpdate = require('log-update');
const { performance } = require('perf_hooks');

const getFilesFromFolder = require('../utils/getFilesFromFolder').getFilesFromFolder;
const db = require('./DB');
const csvToJson = require('../utils/csvToJson');
const journeysJsonValidator = require('../utils/journeysJsonValidator');
const stationsJsonValidator = require('../utils/stationsJsonValidator').stationsJsonValidator;
const mockJourneysImport = require("../../../MockValues/mockJourneysValidated");
const mockJourneys = mockJourneysImport['getMockValue'];
const bicycleStationsFilesPathsFolder = './data/csv/bicycle-stations-dataset'
const bicycleStationsFilesPaths = getFilesFromFolder(bicycleStationsFilesPathsFolder);
const JourneysFilesPathsFolder = './data/csv/journeys'
const journeysFilePaths = getFilesFromFolder(JourneysFilesPathsFolder);


class CsvHandler{

    async saveFilesToDb(){

        let mInterval;
        const frames = ['adding','adding.','adding..','adding...','please wait'];

        let startTime1 = performance.now();
        try {
            console.log('Start adding stations data');
            // console.log('Please wait');
            let i = 0;
            mInterval = setInterval(()=>{
                const frame = frames[i++ % frames.length];
                logUpdate(frame);
            },400);

            for (const fp of bicycleStationsFilesPaths) {
                let jsonArrayResult;
                console.log(fp);
                jsonArrayResult = await csvToJson.convert(fp);
                jsonArrayResult = stationsJsonValidator(jsonArrayResult);
                // console.log(jsonArrayResult);

                for (const j of jsonArrayResult) {
                    const createRequestQ = `INSERT INTO stations (FID,ID,Nimi,Namn,Name,Osoite,Address,Kaupunki,Stad,Operaattor,Kapasiteet,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`
                    const values = Object.values(j);
                    const resp = await db.makeQuery(createRequestQ, values);
                    if(!resp){
                        throw new Error('Bad request');
                    }
                }
            }
            clearInterval(mInterval);
            logUpdate.clear();
            // console.log();
            console.log('\x1b[32m%s\x1b[0m', 'Bicycle stations data was successfully added to the DB');
        }

        catch (e){
            clearInterval(mInterval);
            logUpdate.clear();
            console.log();
            console.log('\x1b[41m%s\x1b[0m', "Bicycle stations wasn't added");
            console.log('No connection to the DB or problems with query');
            console.log(e);
        }
        let endTime1 = performance.now();

        console.log();
        console.log(`The Bicycle stations add operation took ${((endTime1 - startTime1)/1000).toFixed(2)} seconds`);

        let startTime2 = performance.now();
        try {
            console.log();
            console.log('Start adding journeys data');
            console.log('It will take around 3 hours');
            let i = 0;
            mInterval = setInterval(()=>{
                const frame = frames[i++ % frames.length];
                logUpdate(frame);
            },400);

            for (const fp of journeysFilePaths) {
                let jsonArrayResult;
                console.log(fp);
                jsonArrayResult = await csvToJson.convert(fp);
                jsonArrayResult = journeysJsonValidator.convert(jsonArrayResult);
                // jsonArrayResult = mockJourneys;
                // console.log(jsonArrayResult);
                for (const j of jsonArrayResult) {
                    const createRequestQ = `INSERT INTO Journeys (Departure_time,Return_time,Departure_station_id,Departure_station_name,Return_station_id,Return_station_name,Covered_distance_in_meters,Duration_in_sec) VALUES (?,?,?,?,?,?,?,?);`
                    const values = Object.values(j);
                    const resp = await db.makeQuery(createRequestQ, values);
                    if(!resp){
                        throw new Error('Bad request');
                    }
                }
            }
            clearInterval(mInterval);
            logUpdate.clear();
            console.log();
            console.log('\x1b[32m%s\x1b[0m', 'Journeys data was successfully added to the DB');
        }
        catch (e){
            clearInterval(mInterval);
            logUpdate.clear();
            console.log();
            console.log('\x1b[41m%s\x1b[0m', "Journeys data wasn't added");
            console.log('No connection to the DB or problems with query');
            console.log(e);
        }
        let endTime2 = performance.now();
        console.log();
        console.log(`The journeys add operation took ${((endTime2 - startTime2)/1000).toFixed(2)} seconds`)
    }
}


module.exports = CsvHandler


