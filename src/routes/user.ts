import { Router, Request, Response } from "express";
import authMiddleware from "../middlewares";
import { validate } from "../middlewares/validate.middleware";
import { userValidation } from "../validators/user.validation";
import { CreateUsersModel } from "../models";
const userRouter: Router = Router();
userRouter.use(authMiddleware);
userRouter.post(
  "/",
  validate(userValidation.createUser),
  async (req: Request, res: Response) => {
    try {
      const { name, email, role } = req.body;
      await CreateUsersModel.create({ name, email, role });
      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409).json({
          message: "Email already exists",
        });
        return;
      }
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
userRouter.get("/", async (req: Request, res: Response) => {
  const data = await CreateUsersModel.find({});
  res.json({
    data,
  });
});
userRouter.get("/:id", validate(userValidation.idParam), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CreateUsersModel.findOne({
      _id: id,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    res.json({
      message: "user found",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
userRouter.put(
  "/:id",
  validate(userValidation.idParam),
  validate(userValidation.updateUser),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      const user = await CreateUsersModel.updateOne(
        {
          _id: id,
        },
        {
          name,
          email,
          role,
        }
      );
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
      res.json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
userRouter.delete(
  "/:id",
  validate(userValidation.idParam),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await CreateUsersModel.findOne({
      _id: id,
    });
    if (!user) {
      res.json({
        message: "User doesn't exist",
      });
    }
    await CreateUsersModel.deleteOne({
      _id: id,
    });
    res.json({
      message: "user deleted",
    });
  }
);
export default userRouter;
