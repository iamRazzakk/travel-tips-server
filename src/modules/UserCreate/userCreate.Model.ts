import { model, Schema } from 'mongoose';
import { TUser } from './userCreate.interface';
// import bcrypt from "bcryptjs"
const userSchema = new Schema<TUser>({
  name: { type: String, required: [true, 'Full Name is required'], trim: true },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  bio: {
    type: String,
    default: '',
    required: false,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  image: {
    type: String,
    default: null,
    // required: false,
  }
}, { timestamps: true });
export const UserSchema = model<TUser>('User', userSchema);
