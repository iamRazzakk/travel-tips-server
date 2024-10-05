import { Router } from "express";
import { ValidationRequest } from "../../middleware/ValidationRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router()
router.post('/login', ValidationRequest(authValidation.userLoginValidationSchema), authController.loginController)
export const loginRoute = router