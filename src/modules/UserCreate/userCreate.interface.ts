import { USER_ROLE } from './userCreate.constance';

type userRole = 'USER' | 'ADMIN';
export type TUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: userRole;
  bio?: string;
  address: string;
};
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
