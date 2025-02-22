import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { userValidation } from "../validators/user.validation";
import { AuthController } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post(
  "/signup",
  validate(userValidation.signup),
  AuthController.signup
);

authRouter.post(
  "/login",
  validate(userValidation.login),
  AuthController.login
);

export default authRouter;
