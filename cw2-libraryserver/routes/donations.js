// Setting requirements
const express = require("express");
const router = express.Router();
// Connecting database
const db = require("../data");
const ret = require("../lib/return");

// Setting up a GET request to the endpoint
router.get("/", function(req, res) {
    db.Donation.findAll().then(function(donations) {
        ret.json(donations, res);
    });
});
// GET donation by Donation ID
router.get("/:donationID", function(req, res) {
    db.Donation.findByPk(req.params.donationID).then(function(donation) {
        if (donation) {
            ret.json(donation, res);
        } else {
            res.end();
        }
    });
});

// POST a new donation with required fields
router.post("/", function(req, res) {
    db.Donation.create({
        name: req.body.name,
        amount: req.body.amount,
    }).then(function(donation) {
        ret.json(donation, res);
    });
});

module.exports = router;
