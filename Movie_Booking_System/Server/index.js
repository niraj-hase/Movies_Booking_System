const express = require("express");
const PORT = 8000;
const app = express();
const db = require("./config/mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in the running the server");
  }
  console.log("Server is running on port ", PORT);
});
