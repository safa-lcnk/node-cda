import mongoose from 'mongoose'

const RegisterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

export default RegisterModel