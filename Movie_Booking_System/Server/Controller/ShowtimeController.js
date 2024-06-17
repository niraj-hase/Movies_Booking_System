const ShowTime = require("../Model/ShowTime");
const Movie = require("../Model/Movie");
const Screen = require("../Model/Screen");
const Seat = require("../Model/Seat");
const mongoose = require("mongoose");

const availableTimes = [
  { start: "10:00", end: "13:00" },
  { start: "13:30", end: "16:30" },
  { start: "17:00", end: "21:00" },
  { start: "22:30", end: "01:30" },
];

module.exports.createShowTime = async (req, res) => {
  const { movieId, screenId, date, startTime, endTime } = req.body;

  console.log(req.body);

  try {
    const movie = await Movie.findById(movieId);
    const screen = await Screen.findById(screenId);

    if (!movie || !screen) {
      return res.status(404).json({
        success: false,
        message: "Movie or Screen not found",
      });
    }

    // Check if the showtime slot is already booked
    const existingShow = await ShowTime.findOne({
      screen: screenId,
      date,
      startTime,
      endTime,
    });

    if (existingShow) {
      return res.status(400).json({
        success: false,
        message: "Showtime slot already booked",
      });
    }

    // Create new showtime
    const showTime = new ShowTime({
      movie: movieId,
      screen: screenId,
      date,
      startTime,
      endTime,
    });

    // Fetch seats for the screen
    const seats = await Seat.find({ screen: screenId });

    // Associate the existing seats with the new showtime
    showTime.availableSeats = seats.map((seat) => seat._id);

    await showTime.save();

    movie.show_times.push(showTime._id);
    await movie.save();

    res.status(201).json({
      success: true,
      message: "Showtime created successfully",
      showTime,
    });
  } catch (error) {
    console.log("ERROR::::", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports.getShowTimes = async (req, res) => {
  try {
    const showTimes = await ShowTime.find()
      .populate("movie")
      .populate("screen")
      .populate("availableSeats");
    res.status(200).json({
      message: "showTimes",
      showTimes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports.setsForShow = async (req, res) => {
  const { showtimeId } = req.params;

  try {
    // Find the showtime by ID and populate availableSeats with Seat documents
    const showtime = await ShowTime.findById(showtimeId).populate(
      "availableSeats"
    );

    if (!showtime) {
      return res
        .status(404)
        .json({ success: false, message: "Showtime not found" });
    }

    // Extract only necessary seat information to send to the client
    const seats = showtime.availableSeats.map((seat) => ({
      _id: seat._id,
      seatNumber: seat.seatNumber,
      isAvailable: seat.isAvailable,
    }));

    res.status(200).json({ success: true, seats });
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get show details

module.exports.showDetails = async function (req, res) {
  const showId = req.params.id;
  console.log(`Fetching details for show ID: ${showId}`);

  try {
    const show_details = await ShowTime.findById(showId);

    if (!show_details) {
      console.log("Show not found");
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    console.log("Show details fetched successfully");
    return res.status(200).json({
      success: true,
      message: "Show details fetched successfully",
      data: show_details,
    });
  } catch (err) {
    console.error("Error fetching show details:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
