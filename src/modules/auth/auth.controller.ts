// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { signInUserService } from './auth.service';

const loginController = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const loggedInUser = await signInUserService.LoginUser(email, password);

    // const newUser = await signUpUser.createUser(userData);
    // const neeUser = loggedInUser.email 

    // Prepare user data for the token payload


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: loggedInUser,
        // refreshToken: refreshToken,
        // accessToken: accessToken,
    });
});


export const authController = {
    loginController,
};