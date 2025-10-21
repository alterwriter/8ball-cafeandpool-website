import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { bookingValidator } from '../utils/validators.js';
import { create, list, listServices } from '../controllers/bookingController.js';

const router = Router();

router.get('/services', listServices);
router.post('/', authenticate, bookingValidator, create);
router.get('/', authenticate, list);

export default router;
