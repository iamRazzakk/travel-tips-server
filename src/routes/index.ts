import { Router } from 'express';
import { userSingUpRouter } from '../modules/UserCreate/userCreate.routes';
import { loginRoute } from '../modules/auth/auth.routes';

const router = Router();
const appRouterModel = [
    {
        path: '/auth',
        routerFile: userSingUpRouter
    },
    {
        path: '/auth',
        routerFile: loginRoute
    },

];
appRouterModel.forEach(route => router.use(route.path, route.routerFile));
export const Routers = router;
