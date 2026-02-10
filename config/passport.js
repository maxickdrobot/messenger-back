import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/users.js";
import { ErrorCodes } from "../constants/errorCodes.js";

export default function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user.isVerified) {
          return done(null, false, {
            error: {
              code: ErrorCodes.AUTH_ERROR,
              message: "Invalid email or password",
            },
          });
        }
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, {
            error: {
              code: ErrorCodes.AUTH_ERROR,
              message: "Invalid email or password",
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user || false);
    } catch (error) {
      done(error);
    }
  });
}
