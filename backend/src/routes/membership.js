import { Router } from 'express';
import { getTiers, profile } from '../controllers/membershipController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/tiers', getTiers);
router.get('/me', requireAuth, profile);

export default router;
