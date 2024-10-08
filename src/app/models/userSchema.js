import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, minLength: 6, maxLength: 8 },
});

const UserSchema = mongoose.model('users', userSchema);

export default UserSchema;
