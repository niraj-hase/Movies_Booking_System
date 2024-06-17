const mongoose = require("mongoose");
const express = require("express");

const movieSchema = new mongoose.Schema({
  poster_url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  show_times: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowTime",
    },
  ],
  genre: {
    type: [String],
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
