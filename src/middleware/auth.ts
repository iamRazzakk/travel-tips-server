import { NextFunction, Response, Request } from "express";
import { TUserRole } from "../modules/UserCreate/userCreate.interface";
import catchAsync from "../utils/catchAsync";
import { TUserTokenPayload } from "./auth.constance";
import AppError from "../Errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserSchema } from "../modules/UserCreate/userCreate.Model";

export interface CustomRequest extends Request {
    user?: TUserTokenPayload;
}

const auth = (...requiredUserRole: TUserRole[]) => {
    return catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // Check if token is present
        if (!token) {
            return next(new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route"));
        }

        try {
            // Verify the token directly without checking "Bearer "
            const decoded = jwt.verify(token, config.JWT_SECRET as string) as TUserTokenPayload;

            const { email, role } = decoded;

            // Find user by email
            const user = await UserSchema.findOne({ email });

            if (!user) {
                return next(new AppError(httpStatus.UNAUTHORIZED, "You are not authorized"));
            }

            // Check role authorization
            if (requiredUserRole.length > 0 && !requiredUserRole.includes(role)) {
                return next(new AppError(httpStatus.FORBIDDEN, "You have no access to this route"));
            }

            // Attach decoded user to request
            req.user = decoded;

            next();
        } catch (error) {
            if (error instanceof Error) {
                return next(new AppError(httpStatus.UNAUTHORIZED, `Invalid token: ${error.message}`));
            }
            return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token"));
        }
    });
};

export default auth;
