import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Validate credentials (replace with your own logic)
  if (username === 'admin' && password === 'password') {
    // Create a JWT
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

    // Set the JWT as an HTTP-only cookie
    const tokenCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 60 * 60, // 1 hour
      path: '/', // Accessible across the entire site
    });

    res.setHeader('Set-Cookie', tokenCookie);
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}