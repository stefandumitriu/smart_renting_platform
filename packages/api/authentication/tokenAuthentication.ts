import jwt from "jsonwebtoken";
import express from "express";

const secret_token =
  process.env.TOKEN_SECRET ||
  "6cf4a7bd74d9242889f144d131d6c9c4363bcaa43ba98b433319ced8c3251f8e01cb5c5f6595444a3c8a9692de0d1cb1c3c4e4243d67903f27d65cb2b32a0905";

export interface AccessToken {
  userId: string;
}

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, secret_token, { expiresIn: "1h" });
}

export function authenticateToken(
  req: express.Request & { user: string },
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret_token, (error: any, decoded: any) => {
    if (error) {
      console.log(error.message);
      return res.sendStatus(403);
    }
    req.user = (decoded as AccessToken).userId;

    next();
  });
}

export const getUserIdFromAccessToken = (token: string) => {
  const decoded = jwt.verify(token, secret_token) as AccessToken;
  return decoded.userId;
};
