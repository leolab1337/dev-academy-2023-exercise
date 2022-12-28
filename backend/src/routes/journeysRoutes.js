const express = require("express");
const journeyCrudController = require("../controllers/journeysCrud");
const {handleGetResp, handleDeleteResp} = require("../middlewares/reqResHelper");
const router = express.Router();

/**
 * @swagger
 * /journeys:
 *   get:
 *     summary: Get all journeys
 *     description: Returns a list of all journeys
 *     tags:
 *       - journeys
 *     produces: ['application/json']
 *     parameters:
 *       - name: pageSize
 *         in: query
 *         required: false
 *         type: integer
 *         description: Number of journeys to return per page
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
 *           $ref: '#/definitions/GetJourneysAllSuccess'
 *       404:
 *         description: Journeys were not found.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotFoundResponse'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 */
router.get("/",journeyCrudController.getAllJourneys,handleGetResp);


/**
 * @swagger
 * /journeys/{id}:
 *   get:
 *     summary: Get one journey
 *     description: Returns  one journey
 *     tags:
 *       - journeys
 *     produces: ['application/json']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: The ID of the journey to retrieve
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/GetJourneyOneSuccess'
 *       400:
 *         description: Bad Request, try to put a Number Value as the index
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequestResponseGetDelete'
 *       404:
 *         description: The Journey was not found.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotFoundResponse'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 */
router.get("/:id", journeyCrudController.getJourneyById,handleGetResp);



/**
 * @swagger
 * /journeys/{id}:
 *   delete:
 *     summary: Delete a journey
 *     description: Returns  one journey
 *     tags:
 *       - journeys
 *     produces: ['application/json']
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: The ID of the journey to delete
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
 *         description: The Journey was not found.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NotFoundResponseDelete'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/InternalErrorResponse'
 */
router.delete("/:id", journeyCrudController.deleteJourneyById,handleDeleteResp);


module.exports = router;
