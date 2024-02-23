import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Dummy function - replace this with your actual implementation
      done(null, {});
    }
  )
);

export default passport;
