const mongoose = require("mongoose");
const Joi = require("joi");

const countrySchema = new mongoose.Schema({
  name:String,
  capital:String,
  pop:Number,
  img:String,
  date:{
    type:Date, default:Date.now()
  },
  user_id:String,
  
})

exports.CountryModel = mongoose.model("countries",countrySchema);
