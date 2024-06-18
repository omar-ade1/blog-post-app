import jwt from "jsonwebtoken";
import { payloadJwt } from "./interfaces";
import { serialize } from "cookie";

export const generateToken = (payloadJwt: payloadJwt) => {
  // Generate Token
  const token = jwt.sign(payloadJwt, process.env.PRIVATE_KEY_JWT, {
    expiresIn: "30d",
  });
  return token
};


export const generateCookie = (payloadJwt: payloadJwt) => {
  // Generate Token
  const token = generateToken(payloadJwt);

  // Generate Cookie
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // development = http, production = https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 day
  });

  return cookie
}