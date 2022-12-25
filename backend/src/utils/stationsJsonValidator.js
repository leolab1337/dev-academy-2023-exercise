const mockStationsImport = require("../../../MockValues/mockStationsUnvalidated");
const mockStations = mockStationsImport['getMockValue'];


/**
 * This function takes an array of objects representing stations and modifies the keys to match the desired format. Specifically, it looks for keys that include the string "Adress" and replaces it with "Address".
 * @param {Array} stationsJson - An array of objects representing stations.
 * @return {Array} An array of objects with updated keys, where the keys have been modified to match the desired format.
 * @throws {Error} If the input is not an array of objects.
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
