import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export const checkAuth = (req) => {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    throw new Error('Not authenticated');
  }

  return verifyToken(token);
};