import * as express from 'express';
import userRoutes from './users';
const router = express.Router();

router.use('/users', userRoutes);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ title: 'Express api' });
});

export default router;
