import { model, Schema } from 'mongoose';
import { TUser } from './userCreate.interface';
import bcrypt from "bcryptjs"
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
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;

  // Check if the password is modified
  if (user.isModified('password')) {
    try {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Replace the plain password with the hashed password
      user.password = hashedPassword;

    } catch (error) {
      return next(error);
    }
  }

  next();
});
export const UserSchema = model<TUser>('User', userSchema);
