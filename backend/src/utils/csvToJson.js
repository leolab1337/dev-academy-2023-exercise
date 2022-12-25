const csv = require("csvtojson");

/**
 * Converts a CSV file to a JSON array.
 *
 * @param {string} filePath - The path to the CSV file.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects representing the rows of the CSV file.
 *
 * @throws {Error} - If there is an error reading or parsing the CSV file.
 */
exports.convert = (filePath) => {
   return  csv()
        .fromFile(filePath)
        .then(function(jsonArrayObj){
             return jsonArrayObj;
        },()=>{
            console.log('some error with converting csv to json')
        })
};

