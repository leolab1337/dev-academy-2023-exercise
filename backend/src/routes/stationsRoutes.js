const express = require("express");
const stationCrudController = require("../controllers/stations.controller");
const {handleGetResp, handleDeleteResp, handlePostResp, handlePutResp} = require("../middlewares/reqResHelper");
const router = express.Router();


/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Get all stations
 *     description: Returns a list of all stations
 *     tags:
 *       - stations
 *     produces: ['application/json']
 *     parameters:
 *       - name: pageSize
 *         in: query
 *         required: false
 *         type: integer
 *         description: Number of stations to return per page
 *         default: 10
 *       - name: pageNumber
 *         in: query
 *         required: false
 *         type: integer
 *         desc: Page number to return
 *         default: 10
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/GetStationsAllSuccess'
 *       404:
 *         description: Stations were not found.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotFoundResponse'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 *
 *
 *
 */
router.get("/", stationCrudController.getAllStations,handleGetResp);




/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     summary: Get one station
 *     description: Returns  one station
 *     tags:
 *       - stations
 *     produces: ['application/json']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: The ID of the station to retrieve
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/GetStationOneSuccess'
 *       400:
 *         description: Bad Request, try to put a Number Value as the index
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequestResponseGetDelete'
 *       404:
 *         description: The Station was not found.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotFoundResponse'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 */
router.get("/:id", stationCrudController.getStationById,handleGetResp);

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     summary: Delete a station
 *     description: Returns  one station
 *     tags:
 *       - stations
 *     produces: ['application/json']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: The ID of the station to delete
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/SuccessDeleteResponse'
 *       400:
 *         description: Bad Request, try to put a Number Value as the index
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequestResponseGetDelete'
 *       404:
 *         description: The Station was not found.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotFoundResponseDelete'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 */
router.delete("/:id", stationCrudController.deleteStationById,handleDeleteResp);



/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Create a new station
 *     description: Creates a new station and returns the created station
 *     tags:
 *       - stations
 *     produces: ['application/json']
 *     parameters:
 *       - name: station
 *         in: body
 *         required: true
 *         description: The station to create
 *         schema:
 *           type: object
 *           properties:
 *             ID:
 *               type: integer
 *             Nimi:
 *               type: string
 *             Namn:
 *               type: string
 *             Name:
 *               type: string
 *             Osoite:
 *               type: string
 *             Address:
 *               type: string
 *             Kaupunki:
 *               type: string
 *             Stad:
 *               type: string
 *             Operaattor:
 *               type: string
 *             Kapasiteet:
 *               type: integer
 *             x:
 *               type: number
 *               format: 'float'
 *               default: 2.2
 *             y:
 *               type: number
 *               format: 'float'
 *               default: 2.2
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/PostNewStation'
 *       400:
 *         description: Bad Request,try to put a valid JSON
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequestResponsePost'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 */
router.post("/", stationCrudController.postNewStation,handlePostResp);







/**
 * todo update
 */
router.put("/:id", stationCrudController.updateStation,handlePutResp);
module.exports = router;
