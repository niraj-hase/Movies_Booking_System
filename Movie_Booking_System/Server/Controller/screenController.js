const Screen = require("../Model/Screen");
const Seat = require("../Model/Seat");

module.exports.addScreen = async function (req, res) {
  const { name, totalSeats } = req.body;

  try {
    const screen = await Screen.findOne({ name });

    if (screen) {
      return res.status(404).json({
        success: false,
        message: "Screen already present",
      });
    } else {
      const newScreen = await Screen.create({
        name: name,
        totalSeats: totalSeats,
      });

      //create seat
      const seats = [];
      for (let i = 1; i <= totalSeats; i++) {
        seats.push(
          new Seat({
            seatNumber: `Seat ${i}`,
            screen: newScreen._id,
            isAvailable: true,
          })
        );
      }

      const savedSeats = await Seat.insertMany(seats);

      newScreen.seats = savedSeats.map((seat) => seat._id);

      const savedScreen = await newScreen.save();

      console.log("Screen created successfully");

      return res.status(201).json({
        success: true,
        message: "Screen added successfully",
        screenDetails: newScreen,
      });
    }
  } catch (err) {
    console.log("Error in Adding the Screen ::::", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all screens

module.exports.getScreen = async function (req, res) {
  try {
    const screens = await Screen.find({});

    if (!screens) {
      res.status(404).json({
        success: false,
        message: "error getting screens",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: " all screens Fetch successfully",
        data: screens,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
