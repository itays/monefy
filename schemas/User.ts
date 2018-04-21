import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Create a schema
// const userSchema = new Schema({
//   method: {
//     type: String,
//     enum: ['local', 'google', 'facebook'],
//     required: true
//   },
//   local: {
//     email: {
//       type: String,
//       lowercase: true
//     },
//     password: {
//       type: String
//     }
//   },
//   google: {
//     id: {
//       type: String
//     },
//     email: {
//       type: String,
//       lowercase: true
//     }
//   },
//   facebook: {
//     id: {
//       type: String
//     },
//     email: {
//       type: String,
//       lowercase: true
//     }
//   }
// });

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},                            { timestamps: true });
// create a mondel
const User = mongoose.model('user', userSchema);

export default User;