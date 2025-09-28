const express = require("express");
const { SiteModel, validateSite } = require("../models/siteModel");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let data = await SiteModel.find({});
        res.json(data);
        console.log("GET / – success");
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let data = await SiteModel.findById(req.params.id);
        if (!data) return res.status(404).json({ msg: "Site not found" });
        res.json(data);
        console.log(`GET /${req.params.id} – success`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
    }
});

router.post("/", async (req, res) => {
    let validBody = validateSite(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let site = new SiteModel(req.body);
        await site.save();
        res.status(201).json(site);
        console.log("POST / – site created");
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
    }
});

router.delete("/:idDel", async (req, res) => {
    try {
        let idDel = req.params.idDel;
        let deleted = await SiteModel.findByIdAndDelete(idDel);
        if (!deleted) return res.status(404).json({ msg: "Site not found" });
        res.json(deleted);
        console.log(`DELETE /${idDel} – site deleted`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
    }
});

router.put("/:idEdit", async (req, res) => {
    let validBody = validateSite(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let updated = await SiteModel.findByIdAndUpdate(
            req.params.idEdit,
            req.body,
            { new: true } 
        );
        if (!updated) return res.status(404).json({ msg: "Site not found" });
        res.json(updated);
        console.log(`PUT /${req.params.idEdit} – site updated`);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err });
    }
});

module.exports = router;
