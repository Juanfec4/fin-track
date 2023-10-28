import bcrypt from "bcryptjs";

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  let isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
