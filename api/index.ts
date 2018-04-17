import * as express from 'express';
import userRoutes from './users';
import { Record, RecordType } from '../models/Record';
const router = express.Router();

router.use('/users', userRoutes);

/* GET home page. */
router.get('/', (req, res, next) => {
  const expenses: Record[] = [
    new Record(100, RecordType.EXPENSE),
    new Record(200, RecordType.EXPENSE),
  ];
  res.json(expenses);
});

export default router;
