import { USER_ROLE } from './userCreate.constance';

type userRole = 'USER' | 'ADMIN';
export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: userRole;
  bio?: string;
  address: string;
  image?: string
};
export type TUserUpdate = {
  name?: string;
  email?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
  bio?: string;
  address?: string;
  image?: string;
};
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
