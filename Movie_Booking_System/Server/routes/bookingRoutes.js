const express = require("express");
const router = express.Router();
const auth = require("../ Middleware/auth");
const BookingController = require("../Controller/bookingController");
const showTimeController = require("../Controller/ShowtimeController");

router.post("/book", auth.verifyToken, BookingController.book);
router.get(
  "/showtime/:showtimeId/seats",
  auth.verifyToken,
  showTimeController.setsForShow
);

module.exports = router;
