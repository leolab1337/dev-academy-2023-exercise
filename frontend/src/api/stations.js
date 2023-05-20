import { createFetcher } from "./apiBase";

const baseUrl = process.env.REACT_APP_SERVER_URL;
const endpoint = "stations";

/**
 * Fetches a single station by ID.
 *
 * @async
 * @function
 * @name getOneStationById
 * @param {number} id - The ID of the station to fetch.
 * @returns {Promise<Object|Error>} - A promise that resolves with the fetched station object or rejects with an error object.
 */
export const getOneStationById = createFetcher(baseUrl, endpoint, "getOne");


/**
 * Delete a station by ID.
 *
 * @async
 * @function
 * @name deleteStationById
 * @param {string} id - The ID of the station to delete.
 * @returns {Promise<Object|Error>} - A promise that resolves with the deleted station object or rejects with an error object.
 */
export const deleteStationById = createFetcher(baseUrl, endpoint, "deleteOne");


/**
 * Fetches all stations.
 *
 * @async
 * @function
 * @param {number} [pageSize] - The page size for pagination (optional).
 * @param {number} [pageNumber] - The page number for pagination (optional).
 * @name getAllStations
 * @returns {Promise<Object|Error>} - A promise that resolves with the fetched stations object or rejects with an error object.
 */
export const getAllStations = createFetcher(baseUrl, endpoint, "getAll");

/**
 * Creates a new station.
 *
 * @async
 * @function
 * @name postNewStation
 * @param {Object} stationData - The data for the new station.
 * @returns {Promise<Object|Error>} - A promise that resolves with the created station object or rejects with an error object.
 */
export const postNewStation = createFetcher(baseUrl, endpoint, "postNewOne");
