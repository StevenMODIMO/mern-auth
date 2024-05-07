const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const logCheck = require("./middleware/logCheck");
const authCheck = require("./middleware/authCheck");
const app = express();

app.use(cors());
app.use(express.json());
app.use(logCheck);
app.use(authRoutes);

app.get("/", authCheck, (req, res) => {
  res.status(201).json({ message: "Hello from main server" });
});

mongoose
  .connect("mongodb://localhost:27017/mern-auth")
  .then(() => {
    app.listen(8080, () => console.log("http://localhost:8080"));
  })
  .catch((error) => console.log(error));
