import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ user_id: userId }, process.env.TOKEN_SECRET || "", {
    expiresIn: "3d",
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
