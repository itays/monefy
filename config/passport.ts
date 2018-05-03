import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import User from '../schemas/User';

// JSON WEB TOKENS STRATEGY
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      // Find the user given the email
      const user = await User.findOne({ email });

      // If not, handle it
      if (!user) {
        return done(null, false);
      }
      
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'invalid password'});
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));