import passport from "passport";
import passportJWT from "passport-jwt"
import passportLocal from "passport-local";
import { prisma } from "./prisma.js"
import { env } from "../schemas/env.schema.js";
import bcrypt from "bcryptjs";

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      try {
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          return cb(null, false, {
            message: "Email is not registered."
          });
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
          return cb(null, false, {
            message: "Invalid password."
          })
        }

        return cb(null, user, {
          message: "Logged in successfully"
        });

      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET_KEY,
    },
    async (jwtPayload, cb) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: jwtPayload.id,
          },
          select: {
            id: true,
            email: true,
            username: true,
          }
        });

        return user ? cb(null, user) : cb(null, false)

      } catch (error) {
        return cb(error);
      }
    }
  )
);

export { passport };