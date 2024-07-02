import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";

export const authMiddleware = (): Strategy => {
  const extractJwt = ExtractJwt.fromAuthHeaderAsBearerToken();

  const secret = "SecretKey";
  const jwtStrategy = Strategy;
  const header: StrategyOptions = {
    jwtFromRequest: extractJwt,
    secretOrKey: secret,
  };

  const jwtAuth = new jwtStrategy(header, (payload, done) => {
    done(null, true);
  });

  return jwtAuth;
};

export const requireJWTAuth: any = passport.authenticate("jwt", {
  session: false,
});
