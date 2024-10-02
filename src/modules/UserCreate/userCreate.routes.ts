import { Router } from 'express';
import { userCreateValidationSchema } from './userCreate.Velidation';
import { userCreateController } from './userCreate.controller';
import { ValidationRequest } from '../../middleware/ValidationRequest';

const router = Router();
router.post(
  '/signup',
  ValidationRequest(userCreateValidationSchema.createSignUpValidationSchema),
  userCreateController.createUserController,
);
export const userSingUpRouter = router;
