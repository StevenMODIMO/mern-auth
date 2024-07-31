require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const cors = require("cors")

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/image/:filename", async (req, res) => {
  try {
    const imagePath = path.join(__dirname, "image", req.params.filename);
    res.sendFile(imagePath);
  } catch (error) {
    res.status(400).json({ error: "File not found" });
  }
});

app.use("/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
