const mockJourneysImport = require("../../../MockValues/mockJourneysUnvalidated");
const mockJourneys = mockJourneysImport['getMockValue'];

/**
 *
 @param {Array} journeyJson - An array of objects that represents journey data
 @returns {Array} - An array of objects with updated keys
 */
exports.convert = (journeyJson) => {
    let result = [];
    let isPassed = true;
    journeyJson.map(j=>{
        let updatedValues = {};
        for (let [key, value] of Object.entries(j)) {
            if(key === 'Departure'){
                key = 'Departure_time';
            }
            if(key === 'Return'){
                key = 'Return_time';
            }
            if(key.includes('Duration')){
                key = 'Duration_in_sec';
            }
            if(key.includes('Covered')){
                key = 'Covered_distance_in_meters';
            }
            //regular expression for white spaces
            key = key.replace(/\s/g, '_');
            if (typeof value === 'object') {
                value = Object.values(value)[0];
            }

            // checking that duration is longer than 10 secs
            if (key.includes('Duration') && value < 10){
                isPassed = false;
            }
            // checking that duration is not shorter than 10 meters
            if(key.includes('Covered') && value < 10){
                isPassed = false;
            }
                updatedValues[key] = value;
        }
        if(isPassed){
            result.push(updatedValues);
        }
        isPassed = true;
   })
    return result
};

// const newValues = exports.convert(mockJourneys);

// console.log(mockJourneys);
// console.log(newValues);







