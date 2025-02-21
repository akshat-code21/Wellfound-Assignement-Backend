import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
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