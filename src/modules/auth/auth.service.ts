import config from "../../config";
import { UserSchema } from "../UserCreate/userCreate.Model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const LoginUser = async (loginData: TLogin) => {
    const { email, password } = loginData;

    // Trim email to avoid issues with spaces
    const trimmedEmail = email.trim();

    const user = await UserSchema.findOne({ email: trimmedEmail }).select(
        "+password"
    );

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare the trimmed password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    // require('crypto').randomBytes(64).toString('hex')
    const accessToken = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        config.JWT_SECRET as string,
        { expiresIn: config.JWT_E_IN as string }
    );

    const refreshToken = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        config.REFRESH_JWT_SECRET as string,
        { expiresIn: config.JWT_R_IN as string }
    );

    return { user, accessToken, refreshToken };
};
export const singInUserService = {
    LoginUser
}