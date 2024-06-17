const jwt = require("jsonwebtoken");
const User = require("../Model/User");

module.exports.verifyToken = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not provided",
    });
  }

  jwt.verify(token, "something", async function (err, decoded) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    try {
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Attach user object to request object for further middleware or routes to use
      req.user = user;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
};
