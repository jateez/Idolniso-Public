import * as jose from "jose";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY: string = process.env.JWT_SECRET as string;

export const signToken = (payload: JwtPayload) => jwt.sign(payload, SECRET_KEY);

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
