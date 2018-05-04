import * as express from 'express';
import userRoutes from './users';
import authRoutes from './auth';
import { Record, RecordType } from '../models/Record';
import * as passport from 'passport';

const router = express.Router();

router.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);
router.use('/auth', authRoutes);

/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const expenses: Record[] = [
    new Record(100, RecordType.EXPENSE),
    new Record(200, RecordType.EXPENSE),
  ];
  res.json(expenses);
});

export default router;
