import { Router } from "express";
import { ValidationRequest } from "../../middleware/ValidationRequest";
import { authValidation } from "./auth.validation";
import { singInController } from "./auth.controller";

const router = Router()
router.post('/login', ValidationRequest(authValidation.userLoginValidationSchema), singInController.AuthLoginController)
export const loginRoute = router