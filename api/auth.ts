import * as express from 'express';
import * as passport from 'passport';
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import User from '../schemas/User';
import { catchErrors } from '../handlers/errorHandlers';
import { check, validationResult } from 'express-validator/check';
import { signToken } from '../utils';

const router = express.Router();

/*** Register ***/
router.post(
  '/register',
  [
    check('email', 'must be an email')
      .isEmail()
      .trim()
      .normalizeEmail(),
    check('password', 'passwords must be at least 5 chars').isLength({ min: 5 })
  ],
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const errorFormatter = ({
      location,
      msg,
      param,
      value,
      nestedErrors
    }: // tslint:disable-next-line:no-any
    any) => {
      return `${msg}`;
    };
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }
    const { email, password } = req.body;

    // check if email already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: 'email already n use' });
    }
    const newUser = new User({ email, password });
    await newUser.save();

    // sign token
    const token = signToken(newUser);

    // respond with token
    res.status(200).json({ token });
  })
);

/*** Login ***/

router.post(
  '/login',
  passport.authenticate('local', { session: false, failWithError: true }),
  (req: Request, res: Response, next: NextFunction) => {
    const token = signToken(req.user);
    res.json({ token });
  },
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(400).json(err);
  }
);

export default router;
