import { Router, Request, Response } from "express";
import { UsersModel } from "../models";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import Joi from "joi";
const authRouter: Router = Router();

const signupSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    const { name, email, password } = req.body;
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
});
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

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
});
export default authRouter;
