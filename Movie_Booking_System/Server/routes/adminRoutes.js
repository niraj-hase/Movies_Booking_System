const express = require("express");
const router = express.Router();
const AdminController = require("../Controller/adminController");
const ScreenController = require("../Controller/screenController");
const MovieController = require("../Controller/movieController");
const ShowtimeController = require("../Controller/ShowtimeController");
const auth = require("../ Middleware/auth");
const adminAuth = require("../ Middleware/adminAuth");

router.post(
  "/add-movie",
  auth.verifyToken,
  adminAuth,
  MovieController.addMovie
);

router.get(
  "/movie_list",
  auth.verifyToken,
  adminAuth,
  MovieController.movie_list
);

router.post(
  "/add-screen",
  auth.verifyToken,
  adminAuth,
  ScreenController.addScreen
);

router.get(
  "/get-screen",
  auth.verifyToken,
  adminAuth,
  ScreenController.getScreen
);

router.get(
  "/get-bookings",
  auth.verifyToken,
  adminAuth,
  AdminController.getBookings
);

router.get("/get-users", auth.verifyToken, adminAuth, AdminController.getUsers);

router.post(
  "/add-show",
  auth.verifyToken,
  adminAuth,
  ShowtimeController.createShowTime
);
router.get("/show-details", ShowtimeController.getShowTimes);

module.exports = router;
