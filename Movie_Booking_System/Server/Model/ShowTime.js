const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showTimeSchema = new Schema(
  {
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    screen: {
      type: Schema.Types.ObjectId,
      ref: "Screen",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    availableSeats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seat",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShowTime = mongoose.model("ShowTime", showTimeSchema);
module.exports = ShowTime;
