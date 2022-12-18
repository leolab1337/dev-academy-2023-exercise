const csv = require("csvtojson");
/**
 * convert csv to json
 * @param filePath {string}
 */
exports.convert = (filePath) => {
   return  csv()
        .fromFile(filePath)
        .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
             return jsonArrayObj;
        },()=>{
            console.log('some error with converting csv to json')
        })
};
