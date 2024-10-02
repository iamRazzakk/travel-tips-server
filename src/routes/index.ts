import { Router } from 'express';
import { userSingUpRouter } from '../modules/UserCreate/userCreate.routes';

const router = Router();
const appRouterModel = [{ path: '/auth', routerFile: userSingUpRouter }];
appRouterModel.forEach(route => router.use(route.path, route.routerFile));
export const Routers = router;
