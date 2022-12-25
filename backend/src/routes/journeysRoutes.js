const express = require("express");
const journeyCrudController = require("../controllers/journeysCrud");
const {handleGetResp, handleDeleteResp} = require("../middlewares/reqResHelper");
const router = express.Router();



/**
 * journeys
 */
router.get("/",journeyCrudController.getAllJourneys,handleGetResp);
router.get("/:id", journeyCrudController.getJourneyById,handleGetResp);
router.delete("/:id", journeyCrudController.deleteJourneyById,handleDeleteResp);


module.exports = router;
