const Booking = require("../Model/Booking");
const Movie = require("../Model/Movie");
const Seat = require("../Model/Seat");
const Screen = require("../Model/Screen");
const User = require("../Model/User");
const { default: mongoose } = require("mongoose");

module.exports.book = async function (req, res) {
  const { movieId, seatIds, numTickets } = req.body;
  const userId = req.user.id;
  console.log("users Name ::=>", req.user.name);

  try {
    if (!movieId || !seatIds || seatIds.length == 0 || !numTickets) {
      return res.status(400).json({
        success: false,
        message: "Please provide movie ID, seat IDs, and number of tickets",
      });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    const seats = await Seat.find({ _id: { $in: seatIds } });

    if (!seats || seats.length !== seatIds.length) {
      return res.status(404).json({
        success: false,
        message: "Seats not found invalid seats IDs",
      });
    }
    const totalPrice = movie.ticket_price * numTickets;

    seats.map((seat) => {
      if (!seat.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `${seat.seatNumber} is Not available for booking`,
        });
      }
    });

    // create new Booking
    const booking = new Booking({
      user: userId,
      movie: movieId,
      seats: seatIds,
      totalPrice,
    });

    // startMongo DB session
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //save the booking
      const savedBooking = await booking.save();

      // Update seat status to booked
      await Seat.updateMany(
        { _id: { $in: seatIds } },
        { $set: { isAvailable: false } },
        { session }
      );

      // Update User with the new booking
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { booking: savedBooking._id },
        },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({
        success: true,
        message: "Tickets booking are Successful",
        bookingDetails: savedBooking,
      });
    } catch (err) {
      console.log("Error booking tickets :::");
      await session.abortTransaction();
      session.endSession();
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Booking failed. Please try again later",
      });
    }
  } catch (err) {
    console.log("Error in booking the  movie tickets  ::::", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
