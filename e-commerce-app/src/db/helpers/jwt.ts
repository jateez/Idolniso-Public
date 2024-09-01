import * as jose from "jose";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY: string = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export const signToken = (payload: JwtPayload) => jwt.sign(payload, SECRET_KEY);

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const { payload } = await jose.jwtVerify<T>(token, secretKey);

  return payload;
};
