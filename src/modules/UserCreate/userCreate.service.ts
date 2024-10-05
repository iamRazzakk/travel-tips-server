import { NOT_FOUND } from 'http-status';
import AppError from '../../Errors/AppError';
import { TUser, TUserUpdate } from './userCreate.interface';
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



// for update user
const updateUser = async (userId: string, updateData: TUserUpdate) => {
  // Check if the user exists
  const user = await UserSchema.findById(userId);
  if (!user) {
    throw new AppError(NOT_FOUND, "User not found")
  }

  // If a password is being updated, hash it before saving
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // Update the user
  const updatedUser = await UserSchema.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};
export const signUpUser = {
  createUser,

};
export const userUpdateService = {
  updateUser
}
