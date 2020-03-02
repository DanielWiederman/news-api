import { User } from "../entity/User";
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

async function initPassport(passport, email, password) {
  const authUser = async (email, password, done) => {
    const user: User | undefined = await User.findOne({ email: email });
    if (user === null) {
      return done(null, false);
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }), authUser);

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initPassport;
