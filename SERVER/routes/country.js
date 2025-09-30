const express = require("express")
const {auth} =require("../middleWares/auth")
const router = express.Router()
const  {CountryModel}  = require("../models/countryModel");

router.get("/", auth, async (req, res) => {
    try {
        let countries = await CountryModel.find({ user_id: req.tokenData._id });
        res.json(countries);
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
      }
    
});  

router.post("/", auth, async (req, res) => {
    try {
      let country = new CountryModel({
        ...req.body,
        user_id: req.tokenData._id
      });
        await country.save();
        res.json(country);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
});
    
router.put("/:id", auth, async (req, res) => {
    try {
      let country = await CountryModel.findOne({ _id: req.params.id, user_id: req.tokenData._id });
      if (!country) return res.status(404).json({ msg: "Country not found or not authorized" });
      country.name = req.body.name || country.name;
      country.capital = req.body.capital || country.capital;
      country.pop = req.body.pop || country.pop;
      country.img = req.body.img || country.img;
      await country.save();
      res.json(country);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  });
  

  router.delete("/:id", auth, async (req, res) => {
    try {
      let deleted = await CountryModel.findOneAndDelete({ _id: req.params.id, user_id: req.tokenData._id });
      if (!deleted) return res.status(404).json({ msg: "Country not found or not authorized" });
      res.json({ msg: "Deleted successfully", country: deleted });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
});
  
module.exports = router;
  
  
