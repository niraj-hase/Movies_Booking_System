const express = require("express");
const router = express.Router();
const seatsController = require("../Controller/setController");

router.get("/sets_availability/:id", seatsController.getAvailableSeats);
console.log("seats api called...........");

module.exports = router;
