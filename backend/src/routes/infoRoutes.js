import { Router } from 'express';
import { getHomeContent, getOperatingHours, getContactDetails } from '../controllers/infoController.js';

const router = Router();

router.get('/home', getHomeContent);
router.get('/hours', getOperatingHours);
router.get('/contact', getContactDetails);

export default router;
