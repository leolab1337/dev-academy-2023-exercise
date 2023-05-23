const {dynamicBind} = require("../utils/dynamicBind");
const {BaseController} = require("./base.controller");
const journeysService = require("../services/journeys.service");


class JourneysController extends BaseController{
    constructor(service) {
        super(service);
    }
}

const journeysController = new JourneysController(journeysService);
const dynamicBindToJourneysController = dynamicBind(journeysController);


/**
 * Retrieves a page of rows from the journeys table.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the route.
 * @return {Promise<void>} - A promise that resolves when the function has completed.
 *                           The response object will be updated with the result of the query.
 */
const getAllJourneys = dynamicBindToJourneysController(journeysController.getAll);

/**
 * Retrieves a row from the journeys table by its ID.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the route.
 * @return {Promise<void>} - A promise that resolves when the function has completed.
 *                           The response object will be updated with the result of the query.
 *
 * @param {string} req.params.id - The ID of the row to retrieve.
 */
const getJourneyById = dynamicBindToJourneysController(journeysController.getById);


/**
 * Deletes a row from the journeys table by its ID.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the route.
 * @return {Promise<void>} - A promise that resolves when the function has completed.
 *                           The response object will be updated with the result of the query.
 *
 */
const deleteJourneyById = dynamicBindToJourneysController(journeysController.deleteById);

module.exports = {
    getJourneyById,
    getAllJourneys,
    deleteJourneyById
}
