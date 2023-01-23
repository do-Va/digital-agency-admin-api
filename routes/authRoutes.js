import express from 'express';
import rateLimiter from 'express-rate-limit';

import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Gelen istekleri sınırla
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

import authenticateUser from '../middleware/auth.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.get('/logout', logout);

export default router;
