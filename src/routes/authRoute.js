import { Router } from 'express';
import AuthController from '../app/controllers/authController.js';
import authenticated from '../app/middlewares/authenticated.js';
import authorization from '../app/middlewares/authorization.js';

const authRoute = Router();

authRoute.get('/signup', AuthController.signUp);
authRoute.post('/login', AuthController.login);

// Rest api
authRoute.post(
  '/users',
  authenticated,
  authorization('admin'),
  AuthController.createUser
);

authRoute.delete(
  '/users',
  authenticated,
  authorization('manager'),
  AuthController.createUser
);
authRoute.put('/users', authenticated, AuthController.createUser);

export default authRoute;
