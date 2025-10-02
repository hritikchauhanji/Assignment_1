import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // e.g., http://localhost:3000/api/v1/auth/google/callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for user by googleId first
        let user = await User.findOne({ googleId: profile.id });

        // If user not found, check by email
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
        }

        // If still not found, create a new user
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: "", // optional, Google login doesn't need password
          });
        } else if (!user.googleId) {
          // If user exists but has no googleId, save it
          user.googleId = profile.id;
          await user.save({ validateBeforeSave: false });
        }

        done(null, user); // Pass user to the callback
      } catch (err) {
        done(err, null);
      }
    }
  )
);
