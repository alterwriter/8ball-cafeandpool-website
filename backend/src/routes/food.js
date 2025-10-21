import { Router } from 'express';
import { listMenu, createOrder } from '../controllers/foodController.js';

const router = Router();

router.get('/menu', listMenu);
router.post('/orders', createOrder);

export default router;
