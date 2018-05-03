import * as express from 'express';
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import User from '../schemas/User';
import { sign as JwtSign } from 'jsonwebtoken';
import { catchErrors } from '../handlers/errorHandlers';
import { check, validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import * as passport from 'passport';

const router = express.Router();

// tslint:disable-next-line:no-any
const signToken = (user: any) =>
  JwtSign(
    {
      iss: 'monefy',
      sub: user._id,
      iat: Math.round(Date.now() / 1000)
    },
    process.env.SECRET,
    { expiresIn: '3m'}
  );

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ title: 'users' });
});

router.post(
  '/register',
  [
    check('email', 'must be an email')
      .isEmail()
      .trim()
      .normalizeEmail(),
    check('password', 'passwords must be at least 5 chars').isLength({ min: 5 })
  ],
  catchErrors(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
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
    }
  )
);

router.post('/login', passport.authenticate('local', { session: false, failWithError: true}), 
            (req: Request, res: Response, next: NextFunction) => {
              const token = signToken(req.user);
              res.json({token});
},          (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json(err);
});

export default router;
