const express = require("express");
const stationCrudController = require("../controllers/stationsCrud");
const {handleGetResp, handleDeleteResp, handlePostResp, handlePutResp} = require("../middlewares/reqResHelper");
const router = express.Router();


/**
 * stations
 */
router.get("/", stationCrudController.getAllStations,handleGetResp);
router.get("/:id", stationCrudController.getStationById,handleGetResp);
router.post("/", stationCrudController.postNewStation,handlePostResp);
router.put("/:id", stationCrudController.updateStation,handlePutResp);
router.delete("/:id", stationCrudController.deleteStationById,handleDeleteResp);



module.exports = router;
