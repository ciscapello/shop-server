import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required field'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required field']
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

const Users = mongoose.model('Users', usersSchema);

export default Users;
