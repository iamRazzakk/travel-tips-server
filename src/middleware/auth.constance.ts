
export type TUserTokenPayload = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role?: 'USER' | 'ADMIN';
    bio?: string;
    address: string;
    image?: string
};