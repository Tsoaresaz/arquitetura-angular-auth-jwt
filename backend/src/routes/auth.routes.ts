import { Router } from 'express';
import { LoginController } from '../controller/LoginController';

const router = Router();

router.post('/login', LoginController.login);

router.post('/register', LoginController.register);

export default router;
