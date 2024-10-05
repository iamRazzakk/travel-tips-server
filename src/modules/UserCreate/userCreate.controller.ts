import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { signUpUser, userUpdateService } from './userCreate.service';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;


  // Create the new user using the service
  const newUser = await signUpUser.createUser(userData);

  // Prepare user data for the token payload
  const userPayload = {
    _id: newUser._id,
    email: newUser.email,
    role: newUser.role,
    name: newUser.name,
    bio: newUser.bio,
    address: newUser.address,
  };

  // Generate the access token with the user payload
  const accessToken = jwt.sign(userPayload, config.JWT_SECRET as string, {
    expiresIn: config.JWT_E_IN as string,
  });

  // Generate the refresh token with the user payload
  const refreshToken = jwt.sign(userPayload, config.REFRESH_JWT_SECRET as string, {
    expiresIn: config.JWT_R_IN as string,
  });

  // Send the response with the full user object and tokens
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    accessToken: accessToken,
    refreshToken: refreshToken,
    data: newUser,
  });
});
const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(req.body);
  let updateData = {};

  // Check if data is defined and is a valid JSON string
  if (req.body.data) {
    try {
      updateData = JSON.parse(req.body.data);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid data format' });
    }
  }

  // Include image path if file was uploaded
  if (req.file) {
    updateData.image = req.file.path;
  }

  // Update the user using the service
  const updatedUser = await userUpdateService.updateUser(userId, updateData);

  // Send the response with the updated user
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

export const userCreateController = {
  createUserController,
  updateUserController
};
