const express = require("express");
const router = express.Router();
const HomeController = require("../Controller/HomeController");
const { route } = require("./UserRoutes");

//user
router.use("/user", require("./UserRoutes"));
router.use("/movie", require("./movieRoutes"));
router.use("/booking", require("./bookingRoutes"));
router.use("/admin", require("./adminRoutes"));
router.use("/sets", require("./seatRoutes"));

router.get("/", HomeController.home);

module.exports = router;
