const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { APIGateway } = require("./routes/shared/APIGateway");

const BASE_PATH = process.env.USERS_HOST;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, authenticate(jwt_payload));
  })
);

async function authenticate(user) {
  try {
    const response = await APIGateway.request({
      basePath: BASE_PATH,
      endpoint: `/api/v1/users/${user._id}`,
    });
    const savedUser = response.data;
    const isAuthentic =
      savedUser.username == user.username && savedUser.email == user.email
        ? true
        : false;
    return isAuthentic;
  } catch (error) {
    console.log(error);
  }
}

module.exports = passport;
