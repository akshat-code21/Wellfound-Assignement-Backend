import { Request, Response } from "express";
import { UsersModel } from "../models";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UsersModel.find({}, { hashedPassword: 0 });
      res.status(200).json(users);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await UsersModel.findById(req.params.id, { hashedPassword: 0 });
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { name, email, role } = req.body;
      const user = await UsersModel.findByIdAndUpdate(
        req.params.id,
        { name, email, role },
        { new: true, select: '-hashedPassword' }
      );

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await UsersModel.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
} 