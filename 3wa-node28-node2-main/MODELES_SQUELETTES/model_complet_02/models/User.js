import mongoose from 'mongoose'

const RegisterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

export default RegisterModel