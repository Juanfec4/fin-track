//Username (3-20 chars, only letters, numbers and underscores)
export const isValidUsername = (input: string): boolean => {
  const minLength = 3;
  const maxLength = 20;
  const validCharactersRegex = /^[a-zA-Z0-9_]+$/;

  if (input.length < minLength || input.length > maxLength) return false;

  return validCharactersRegex.test(input);
};

//Email
export const isValidEmail = (input: string): boolean => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
};

//Password (1 uppercase, 1 lowercase, 8 chars, 1 special char, 1 number)
export const isValidPassword = (input: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/;
  return passwordRegex.test(input);
};
