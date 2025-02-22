import { Router } from "express";
import authMiddleware, { adminMiddleware } from "../middlewares";
import { validate } from "../middlewares/validate.middleware";
import { userValidation } from "../validators/user.validation";
import { UserController } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.use(authMiddleware);

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", validate(userValidation.idParam, 'params'), UserController.getUserById);
userRouter.put(
  "/:id",
  validate(userValidation.idParam, 'params'),
  validate(userValidation.updateUser),
  UserController.updateUser
);
userRouter.delete(
  "/:id",
  adminMiddleware,
  validate(userValidation.idParam, 'params'),
  UserController.deleteUser
);

export default userRouter;
