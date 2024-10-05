import { Router } from 'express';
import { userCreateValidationSchema } from './userCreate.Velidation';
import { userCreateController } from './userCreate.controller';
import { ValidationRequest } from '../../middleware/ValidationRequest';
import { multerUpload } from '../../config/multer.config';

const router = Router();
router.post(
  '/signup',
  ValidationRequest(userCreateValidationSchema.createSignUpValidationSchema),
  userCreateController.createUserController,
);
router.put(
  '/user/:id',
  multerUpload.single('file')
  ,
  ValidationRequest(userCreateValidationSchema.updateUserValidationSchema),
  userCreateController.updateUserController
);
export const userSingUpRouter = router;
