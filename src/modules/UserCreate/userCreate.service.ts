import { TUser } from './userCreate.interface';
import { UserSchema } from './userCreate.Model';

const createUser = async (payload: TUser) => {
  const newUser = await UserSchema.create(payload);
  return newUser;
};
export const singUpUser = {
  createUser,
};

export const userCreateService = {
  createUser,
};
