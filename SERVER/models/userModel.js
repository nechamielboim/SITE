const mongoose = require("mongoose");
// ספרייה לוולידציה
const Joi = require("joi");
// ספרייה ליצירת JWT
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  data_created: { type: Date, default: Date.now }
});

// מייצא מודל
exports.UserModel = mongoose.model("users", userSchema);

// פונקציה שמייצרת טוקן
exports.createToken = (user_id) => {
  // בודק אם יש סוד ב־env, אחרת ברירת מחדל
  const secret = process.env.JWT_SECRET || "tehilaSecret";
  let token = jwt.sign({ _id: user_id }, secret, { expiresIn: "60m" });
  return token;
};

// ולידציה לרישום משתמש חדש
exports.validateUser = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });
  return joiSchema.validate(_reqBody);
};

// ולידציה ל־Login
exports.validLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });
  return joiSchema.validate(_reqBody);
};
