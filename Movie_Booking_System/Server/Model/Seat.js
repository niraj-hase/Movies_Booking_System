
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screen',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
