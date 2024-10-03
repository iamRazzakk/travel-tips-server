import { Request, Response } from "express";
import config from "../../config";
import { singInUserService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const AuthLoginController = async (req: Request, res: Response) => {
    try {
        const loginData = req.body;
        const result = await singInUserService.LoginUser(loginData);
        const { refreshToken } = result;
        res.cookie("refreshToke", refreshToken, {
            secure: config.NODE_DEV === "production",
            httpOnly: true,
        });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User login successfully",
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            data: result.user,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: "Failed to login user",
            data: error,
        });
    }
};
export const singInController = {
    AuthLoginController
}