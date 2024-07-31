const { signupUser, loginUser } = require("../controllers/userControllers");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/signup", upload.single('image'), signupUser);

router.post("/login", loginUser);

module.exports = router;
