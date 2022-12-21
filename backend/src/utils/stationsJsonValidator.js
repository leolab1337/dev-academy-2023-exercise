const mockStationsImport = require("../../../MockValues/mockStationsUnvalidated");
const mockStations = mockStationsImport['getMockValue'];


/**
 *
 * @param stationsJson{object[]}
 * @returns {*object[]}
 */
const stationsJsonValidator = (stationsJson) => {
    // console.log(mockStations);
    let result = [];

    // mockStations.map(s=>{
    stationsJson.map(s=>{
        let updatedValues = {};
        for (let [key, value] of Object.entries(s)){
            if(key.includes('Adress')){
                key = 'Address';
            }

            updatedValues[key] = value;
            // console.log(updatedValues);
        }
        result.push(updatedValues);
    })
    // console.log(result)
    return result;
}


module.exports.stationsJsonValidator = stationsJsonValidator;
