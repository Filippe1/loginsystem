import { createRouter } from 'next-connect';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 24 },
});

const router = createRouter();

router.use(cookieParser());
router.use(sessionMiddleware);

router.get((req, res) => {
  console.log('Session data:', req.session.user);
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
    res.end(); // Explicitly end the response
  } else {
    res.status(401).json({ message: 'Not authenticated' });
    res.end(); // Explicitly end the response
  }
});

export default router.handler();