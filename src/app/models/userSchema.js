import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, minLength: 6, maxLength: 8 },
});

// Được thực hiện trước khi 1 hành gì đó xảy ra xuống database
userSchema.pre('save', function (next) {
  // Khi thực hiện xong 1 action gì đó thì call next() để di tiếp đến step tiếp theo
  const user = this;

  if (!user.isModified('password')) return next(); // In case password not change we skip encryt password

  const salt = bcrypt.genSaltSync(config.bcryt.salt); // chinh => clskshinh => clskshinhsdsd  => clskshinhsdsd => ... => finalResult
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return null;

  const isAuthenticated = await bcrypt.compare(password, user.password);

  return isAuthenticated ? user : null;
};

const UserSchema = mongoose.model('users', userSchema);

export default UserSchema;
