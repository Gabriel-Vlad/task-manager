import bcrypt from "bcrypt";

const comparePasswords = async (
  userPassword: string,
  candidatePassword: string,
): Promise<Boolean> => {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword);
  return isMatch;
};

export default comparePasswords;
