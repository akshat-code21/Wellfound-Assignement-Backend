import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UsersModel } from "../models";
const authMiddleware = async(req:Request,res:Response,next:NextFunction) => {
    const headers = req.headers['authorization'];
    const token = headers?.split(' ')[1];
    if(!token){
        res.json({
            message : "No JWT ToKen"
        })
        return;
    }
    const decoded = jwt.verify(token,JWT_SECRET as string);
    if(decoded){
        req.userId = (decoded as JwtPayload).userId;
        next()
    }else{
        res.json({
            message : "JWT ERROR"
        });
    }
};
export default authMiddleware

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UsersModel.findOne({ _id: req.userId });
    
    if (!user || user.role !== 'admin') {
      res.status(403).json({
        message: "Access denied. Admin privileges required."
      });
      return;
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
    return;
  }
};