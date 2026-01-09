import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token expired" });
  }
};
