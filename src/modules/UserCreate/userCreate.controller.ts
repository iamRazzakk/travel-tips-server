import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { signUpUser } from './userCreate.service';
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

export const userCreateController = {
  createUserController,
};
