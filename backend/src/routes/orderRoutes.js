import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { orderValidator } from '../utils/validators.js';
import { listMenu, create, list } from '../controllers/orderController.js';

const router = Router();

router.get('/menu', listMenu);
router.post('/', authenticate, orderValidator, create);
router.get('/', authenticate, list);

export default router;
