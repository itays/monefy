import { Schema, model, Model, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  isValidPassword(password: string): boolean;
}

// Create a schema
// const Schema = mongoose.Schema;

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

const userSchema: Schema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);
userSchema.pre('save', async function(next: HookNextFunction) {
  try {
    // if (this.method !== 'local') {
    //     next();
    // }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
} catch (error) {
    next(error);
}
});

userSchema.methods.isValidPassword = async function(newPassword: string) {
  try {
    const isValid = await bcrypt.compare(newPassword, this.password);
    return isValid;
  } catch (error) {
    throw new Error(error);
  }
};

// create a mondel
const User: Model<UserModel> = model<UserModel>('user', userSchema);

export default User;
