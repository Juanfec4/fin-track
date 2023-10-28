import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
export const generateToken = (userId: string): string => {
  const token = jwt.sign({ user_id: userId }, process.env.TOKEN_SECRET || "", {
    expiresIn: "1d",
  });
  return token;
};

export const generateRefreshToken = (userId: string): string => {
  const token = jwt.sign(
    { user_id: userId },
    process.env.REFRESH_TOKEN_SECRET || "",
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const verifyToken = (token: string): JwtPayload | undefined => {
  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || ""
    ) as JwtPayload;

    return decoded;
  } catch (e) {
    return undefined;
  }
};
