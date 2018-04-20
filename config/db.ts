import * as mongoose from 'mongoose';
export default () => {
  require('mongoose').Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URL);
  const monDb = mongoose.connection;
  monDb.on('error', () => {
    throw new Error('MongoDB Connection Error. Please make sure that is running');
  });
  monDb.on('open', () => {
    // tslint:disable-next-line:no-console
    console.info('Connected to mongodb:');
  });
};