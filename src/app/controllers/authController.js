import UserSchema from '../models/userSchema.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import HttpStatusCode from '../constants/httpStatusCode.js';
import { BadRequest, SuccessResponse } from '../apiResponses/apiResponse.js';

class AuthController {
  signUp(req, res, next) {
    // Get data from model
    res.render('signup');
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    // 1. Find User by email has existed in database or not
    const getUser = await UserSchema.login(email, password);

    if (!getUser) {
      return res
        .status(HttpStatusCode.BadRequest)
        .send(new BadRequest('Email is not existed, please try again!'));
    }

    const payload = { email: getUser.email, roles: ['user'] };
    const token = jwt.sign(payload, config.jwt.secretKey, {
      expiresIn: Number.parseInt(config.jwt.expiresIn),
    });

    res.send(
      new SuccessResponse({
        access_token: token,
      })
    );
  }

  async createUser(req, res, next) {
    try {
      const { email, password } = req.body;
      // 1. Validate email
      if (!validator.isEmail(email)) {
        return res
          .status(HttpStatusCode.BadRequest)
          .send(new BadRequest('Email format is invalid!'));
      }

      throw Error('Errro server');

      // 2. Find User by email has existed in database or not
      const getUser = await UserSchema.findOne({
        email,
      });

      if (getUser) {
        return res
          .status(HttpStatusCode.BadRequest)
          .send(new BadRequest('Email is existing, please try again!'));
      }

      // 3. Create model to insert database
      const user = new UserSchema({
        email,
        password,
      });

      // 4. Save to database and return result
      await user.save();
      return res.status(HttpStatusCode.Ok).send(new SuccessResponse(user));
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
