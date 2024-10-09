import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../UserCreate/userCreate.Model';
import config from '../../config';

const LoginUser = async (email: string, password: string) => {
    // User email diye check kora

    const user = await UserSchema.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    const userPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        bio: user.bio,
        address: user.address,
    };

    // Generate the access token with the user payload
    const accessToken = jwt.sign(userPayload, config.JWT_SECRET as string, {
        expiresIn: config.JWT_E_IN as string,
    });

    // Generate the refresh token with the user payload
    const refreshToken = jwt.sign(userPayload, config.REFRESH_JWT_SECRET as string, {
        expiresIn: config.JWT_R_IN as string,
    });

    return { user, accessToken, refreshToken };
};



export const signInUserService = {
    LoginUser,
};
