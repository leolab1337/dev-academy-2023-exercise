const fs = require("fs");

/**
 *Get array with files paths from a folder
 * @param folderPath
 * @returns {string[]|unknown[]}
 */
const getFilesFromFolder = (folderPath) => {
    return fs.readdirSync(folderPath).map(f => folderPath + '/' + f);
}

module.exports.getFilesFromFolder = getFilesFromFolder;
