import bcrypt from 'bcryptjs';
import { UserSchema } from '../UserCreate/userCreate.Model';

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

    return user;
};



export const signInUserService = {
    LoginUser,
};
