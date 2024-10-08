import UserSchema from '../models/userSchema.js';

class AuthController {
  signUp(req, res, next) {
    // Get data from model
    res.render('signup');
  }

  async createUser(req, res, next) {
    const { email, password } = req.body;
    // 1. Validate email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        message: 'Email format is invalid!',
      });
    }

    // 2. Find User by email has existed in database or not
    const getUser = await UserSchema.findOne({
      email,
    });

    if (getUser) {
      return res.status(400).send({
        message: 'Email is existing, please try again!',
      });
    }

    // 3. Create model to insert database
    const user = new UserSchema({
      email,
      password,
    });

    // 4. Save to database and return result

    await user.save();

    return res.status(200).send({
      message: 'Create user successfully',
    });
  }
}

export default new AuthController();
