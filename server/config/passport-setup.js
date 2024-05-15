const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/userModel");

// Serialize and Deserialize user

passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);

passport.use(
  new TwitterStrategy({}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  })
);
