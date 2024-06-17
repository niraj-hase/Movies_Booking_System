const Booking = require("../Model/Booking");
const User = require("../Model/User");

module.exports.getBookings = async function (req, res) {
  try {
    const bookings = await Booking.find({});

    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "Bookings not found",
      });

      return res(200).json({
        success: true,
        message: "getting Bookings successful",
        booking_data: bookings,
      });
    }
  } catch (err) {
    console.log("ERROR IN GETTING BOOKING DETAILS ::::", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Error in getting users list",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Users display successfully",
      users_data: users,
    });
  } catch (err) {
    console.log("ERROR IN GETTING BOOKING DETAILS ::::", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
