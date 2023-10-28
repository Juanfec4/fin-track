import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 8;
  let salt = await bcrypt.genSalt(saltRounds);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
