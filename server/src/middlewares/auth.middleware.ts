import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jsonWebToken";
import { JwtPayload } from "jsonwebtoken";

//For proper assignment of variable in request
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  //Validate token presence in header
  if (!req.headers["Authorization"])
    return res.status(403).json("Missing token.");

  //Extract token from header
  const token = req.headers["Authorization"] as string;

  //Validate token
  const payload = await verifyToken(token);

  //Verify that the token exists
  if (!payload?.["user_id"]) return res.status(401).json("Invalid token.");

  //Add user details to request and move on to next middleware or router
  req.userId = payload.user_id;
  next();
};
