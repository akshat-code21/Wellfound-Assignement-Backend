import { Router, Request, Response } from "express";
import { UsersModel } from "../models";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
const authRouter: Router = Router();
authRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await UsersModel.create({
    name: name,
    email: email,
    hashedPassword: hashedPassword,
  });
  res.status(200).json({
    message: "user created sucessfully",
  });
});
authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({
    email: email,
  });
  const compare = await bcrypt.compare(
    password,
    user?.hashedPassword as string
  );
  if (!compare) {
    res.json({
      message: "incorrect password",
    });
    return;
  }
  const token = jwt.sign(
    {
      userId: user?._id,
    },
    JWT_SECRET as string
  );
  res.json({
    message: "sign-in successful",
    token,
  });
});
export default authRouter;
