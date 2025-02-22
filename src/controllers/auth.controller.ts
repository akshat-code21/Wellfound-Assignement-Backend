import { Request, Response } from "express";
import { UsersModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const saltRounds = 10;

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
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
        name,
        email,
        hashedPassword,
        role: assignedRole,
      });

      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UsersModel.findOne({ email });
      if (!user) {
        res.status(401).json({
          message: "Invalid credentials",
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
      if (!isPasswordValid) {
        res.status(401).json({
          message: "Invalid credentials",
        });
        return;
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET as string,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
} 