import { Router, Request, Response } from "express";
import { UsersModel } from "../models";
import { validate } from "../middlewares/validate.middleware";
import { userValidation } from "../validators/user.validation";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
const authRouter: Router = Router();

authRouter.post(
  "/signup",
  validate(userValidation.signup),
  async (req: Request, res: Response) => {
    try {
      const { name, email, password,role } = req.body;
      const assignedRole = role && role === "admin" ? "admin" : "user";
      const existingUser = await UsersModel.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          message: "Email already registered",
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await UsersModel.create({
        name: name,
        email: email,
        hashedPassword: hashedPassword,
        role: assignedRole,
      });
      res.status(201).json({
        message: "user created sucessfully",
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

authRouter.post(
  "/login",
  validate(userValidation.login),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UsersModel.findOne({
        email: email,
      });
      if (!user) {
        res.status(401).json({
          message: "Invalid email or password",
        });
        return;
      }
      const isValidPassword = await bcrypt.compare(
        password,
        user?.hashedPassword as string
      );

      if (!isValidPassword) {
        res.status(401).json({
          message: "Invalid email or password",
        });
        return;
      }
      const token = jwt.sign(
        {
          userId: user?._id,
        },
        JWT_SECRET as string
      );
      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

export default authRouter;
