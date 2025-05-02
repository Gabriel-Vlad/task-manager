import bcrypt from "bcrypt";

const hashInput = async (input: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedInput = await bcrypt.hash(input, salt);
  return hashedInput;
};

export default hashInput;
