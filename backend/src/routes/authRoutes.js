import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../utils/validators.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.get('/me', authenticate, me);

export default router;
