import { Router, Request, Response } from "express";
import authMiddleware from "../middlewares";
import { CreateUsersModel } from "../models";
const userRouter: Router = Router();
userRouter.use(authMiddleware);
userRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  await CreateUsersModel.create({
    name,
    email,
    role,
  });
  res.json({
    message: "user created",
  });
});
userRouter.get("/", async (req: Request, res: Response) => {
  const data = await CreateUsersModel.find({});
  res.json({
    data,
  });
});
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await CreateUsersModel.findOne({
    _id: id,
  });
  if (!user) {
    res.json({
      message: "user not found",
    });
    return;
  }
  res.json({
    message: "user found",
    user,
  });
});
userRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  await CreateUsersModel.updateOne(
    {
      _id: id,
    },
    {
      name,
      email,
      role,
    }
  );
});
userRouter.delete("/:id", async (req: Request, res: Response) => {
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
});
export default userRouter;
