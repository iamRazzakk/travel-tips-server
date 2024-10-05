import { TUser } from './userCreate.interface';
import { UserSchema } from './userCreate.Model';
import bcrypt from 'bcryptjs';

const createUser = async (payload: TUser) => {
  // Check if a user with the same email already exists
  const existingUser = await UserSchema.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  // Hash the password before saving the user
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Update the payload with the hashed password
  const newUserPayload = {
    ...payload,
    password: hashedPassword,
  };

  // Create the new user
  const newUser = await UserSchema.create(newUserPayload);
  return newUser;
};

export const signUpUser = {
  createUser,
};
