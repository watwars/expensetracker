import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    toast.error('Sorry, error creating your account. Please try again.');
    return null;
  }
};

export const print = <T>(message: T): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
};
