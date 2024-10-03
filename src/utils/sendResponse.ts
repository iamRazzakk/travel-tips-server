import { Response } from 'express';

export interface TSendResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  data: T;
}
const sendResponse = <T>(res: Response, data: TSendResponseData<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    data: data.data,
  });
};
export default sendResponse;
