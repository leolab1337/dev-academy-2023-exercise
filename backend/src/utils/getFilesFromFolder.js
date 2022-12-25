const fs = require("fs");

/**
 * Gets the file paths for all files in a specified folder.
 *
 * @param {string} folderPath - The path to the folder.
 *
 * @returns {string[]} - An array of strings representing the file paths for all files in the folder.
 *
 * @throws {Error} - If there is an error reading the folder or accessing its files.
 */
const getFilesFromFolder = (folderPath) => {
    return fs.readdirSync(folderPath).map(f => folderPath + '/' + f);
}

module.exports.getFilesFromFolder = getFilesFromFolder;
