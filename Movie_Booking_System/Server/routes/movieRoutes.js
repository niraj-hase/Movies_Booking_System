const express = require("express");
const router = express.Router();
const movieController = require("../Controller/movieController");
const showController = require("../Controller/ShowtimeController");
router.get("/movie_list", movieController.movies);
router.get("/showInfo/:id", showController.showDetails);

module.exports = router;
