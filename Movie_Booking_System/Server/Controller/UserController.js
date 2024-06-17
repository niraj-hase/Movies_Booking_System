const User = require("../Model/User");
const jwt = require("jsonwebtoken");

module.exports.create = async function (req, res) {
  console.log("User Creation request called");

  console.log(req.body);

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
      });
      return res.status(201).json({
        success: true,
        message: "User successfully created",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Email ID already present",
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "User creation failed",
    });
  }
};

// token generateToken
function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, "something", {
    expiresIn: "1h",
  });
}

module.exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return token and user data
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

//Profile
module.exports.profile = async function (req, res) {
  try {
    return res.status(201).json({
      success: true,
      message: "Profile page load Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "page load Failed ",
    });
  }
};
