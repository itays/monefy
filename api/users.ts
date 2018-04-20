import * as express from 'express';
import User from '../schemas/User';
import { catchErrors } from '../handlers/errorHandlers';
import { check, validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ title: 'users' });
});

router.post('/register', [
  check('email', 'must be an email').isEmail().trim().normalizeEmail(),
  check('password', 'passwords must be at least 5 chars').isLength({ min: 5 })
],          catchErrors(
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // tslint:disable-next-line:no-any
    const errorFormatter = ({ location, msg, param, value, nestedErrors }: any) => {
      return `${msg}`;
    };
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }
    const user = matchedData(req);
    const { email, password } = req.body;
    const newUser = new User({ email, password});
    await newUser.save();
    res.json(newUser);
}));

export default router;
