import { Router } from 'express';
import AuthController from '../app/controllers/authController.js';

const authRoute = Router();

authRoute.get('/signup', AuthController.signUp);
authRoute.post('/login', AuthController.login);

// Rest api
// auth/
authRoute.post('/users', AuthController.createUser);

export default authRoute;
