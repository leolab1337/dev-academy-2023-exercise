import { createFetcher } from "./apiBase";

const baseUrl = process.env.REACT_APP_SERVER_URL;
const endpoint = "journeys";

/**
 * Fetches a single journey by ID.
 *
 * @async
 * @function
 * @name getOneJourneyById
 * @param {number} id - The ID of the station to fetch.
 * @returns {Promise<Object|Error>} - A promise that resolves with the fetched station object or rejects with an error object.
 */
export const getOneJourneyById = createFetcher(baseUrl, endpoint, "getOne");


/**
 * Delete a journey by ID.
 *
 * @async
 * @function
 * @name deleteJourneyById
 * @param {string} id - The ID of the journey to delete.
 * @returns {Promise<Object|Error>} - A promise that resolves with the fetched journey object or rejects with an error object.
 */
export const deleteJourneyById = createFetcher(baseUrl, endpoint, "deleteOne");


/**
 * Fetches all journeys.
 *
 * @async
 * @function
 * @param {number} [pageSize] - The page size for pagination (optional).
 * @param {number} [pageNumber] - The page number for pagination (optional).
 * @name getAllJourneys
 * @returns {Promise<Object|Error>} - A promise that resolves with the fetched journeys object or rejects with an error object.
 */
export const getAllJourneys = createFetcher(baseUrl, endpoint, "getAll");

/**
 * Creates a new Journey.
 *
 * @async
 * @function
 * @name postNewStation
 * @param {Object} stationData - The data for the new journey.
 * @returns {Promise<Object|Error>} - A promise that resolves with the created journey object or rejects with an error object.
 */
export const postNewJourney = createFetcher(baseUrl, endpoint, "postNewOne");
