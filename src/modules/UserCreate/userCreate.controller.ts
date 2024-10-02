import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userCreateService } from './userCreate.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const result = req.body;
  const newService = await userCreateService.createUser(result);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created successfully',
    data: newService,
  });
});
export const userCreateController = {
  createUserController,
};
