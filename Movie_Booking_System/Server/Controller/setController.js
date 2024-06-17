// controllers/showTimeController.js

const ShowTime = require("../Model/ShowTime");
const Seat = require("../Model/Seat");

module.exports.getAvailableSeats = async function (req, res) {
  const showTimeId = req.params.id;
  console.log(req.params.id);
  console.log("Api called.............");

  try {
    const showTime = await ShowTime.findById(showTimeId).populate(
      "availableSeats"
    );
    if (!showTime) {
      console.log("error in getting seats.");
      return res
        .status(404)
        .json({ success: false, message: "Show time not found" });
    }

    res.status(200).json({ success: true, seats: showTime.availableSeats });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
