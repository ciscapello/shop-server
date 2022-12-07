import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
  name: string;
  email: string;
  role: string;
  password: string;
  confirm_password: string;
}

interface UserMethods {
  correctPassword: (arg1: string, arg2: string) => Promise<boolean>;
}

type UserModel = Model<User, {}, UserMethods>;

const usersSchema = new mongoose.Schema<User, UserModel, UserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Name is required field']
    },
    email: {
      type: String,
      required: [true, 'Email is required field'],
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Password is required field']
    },
    confirm_password: {
      type: String,
      required: [true, 'Confirm password please'],
      validate: {
        validator: function (val: string) {
          return val === this.password;
        },
        message: 'Password is not the same'
      }
    }
  },
  {
    versionKey: false
  }
);

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // this.confirm_password = '';
  next();
});

usersSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = mongoose.model('Users', usersSchema);

export default Users;
