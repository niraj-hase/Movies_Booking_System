const Movie = require("../Model/Movie");
const ShowTime = require("../Model/ShowTime");

module.exports.movie_list = async function (req, res) {
  try {
    const movies = await Movie.find({});

    if (!movies) {
      console.log("Movies not found");
      return res.status(404).json({
        message: "movies not found",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "movies list returned successfully",
        movies_list: movies,
      });
    }
  } catch (err) {
    console.log("Error in movie list fetching ::::", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.movies = async function (req, res) {
  try {
    const showTimes = await ShowTime.distinct("movie");

    if (!showTimes || showTimes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No movies found in showtimes",
      });
    }

    const movieArray = await Movie.find({ _id: { $in: showTimes } });

    if (!movieArray || movieArray.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Movies list not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie list fetched successfully",
      movieList: movieArray,
    });
  } catch (err) {
    console.log("Error in movie list fetching ::::", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.addMovie = async function (req, res) {
  const { poster_url, title, genre, ticket_price } = req.body;

  console.log("add movie control called");

  console.log("ERROR ::::", req.body);

  try {
    const movie = await Movie.findOne({ title });
    if (!movie) {
      m = await Movie.create({
        poster_url: poster_url,
        title: title,
        genre: genre,
        ticket_price: ticket_price,
      });
      console.log("movie Added successfully.");
      return res.status(201).json({
        success: true,
        message: "movie added successfully",
        data: m,
      });
    } else {
      console.log("Movie already present Error");
      return res.status(400).json({
        success: false,
        message: "Movie already present",
      });
    }
  } catch (err) {
    console.log("Error in adding movie ::::", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
