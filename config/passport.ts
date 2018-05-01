import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import User from '../schemas/User';

// tslint:disable-next-line:no-any
passport.serializeUser((user: any, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => done(null, id));

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
      done(null, email);
    } catch (error) {
      done(error, false);
    }
  }
));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
// export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//   const provider = req.path.split('/').slice(-1)[0];

//   if (_.find(req.user.tokens, { kind: provider })) {
//     next();
//   } else {
//     res.redirect(`/auth/${provider}`);
//   }
// };
