import jwt, { JwtPayload } from "jsonwebtoken";
export async function checking(token) {
  if (!token) {
    return null
  }
  const varfiyToken =  jwt.verify(token, process.env.PRIVATE_KEY_JWT) as JwtPayload;
  return varfiyToken;
}
