import { NextFunction ,Request,Response} from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
        userId: string;
        }
    }
    }

    //send userId to req object
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default verifyToken;