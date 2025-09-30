const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// סכמה למשתמש
let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  data_created: { type: Date, default: Date.now },
  role: { type: String, default: "user" } // S גדולה!
});

// מייצא מודל
exports.UserModel = mongoose.model("users", userSchema);

// פונקציה שמייצרת JWT
exports.createToken = (user_id, role) => {
  const secret = process.env.JWT_SECRET || "tehilaSecret";
  return jwt.sign({ _id: user_id, role }, secret, { expiresIn: "60m" });
};

// ולידציה לרישום משתמש חדש
exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });
  return joiSchema.validate(_reqBody);
};

// ולידציה ל־Login
exports.validLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });
  return joiSchema.validate(_reqBody);
};
