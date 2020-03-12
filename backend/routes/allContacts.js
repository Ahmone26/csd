const express = require('express');
const router = express.Router();
const passport = require('passport');
const Contact = require("../models/Contact");

// routes for finding company and deleting contact by id


router.get("/:company", passport.authenticate('jwt', {session: false}) ,(req, res) => {
    var query = { company: req.params.company };
    Contact.find(query)
       .then(contatcs => res.json(contatcs))
       .catch(err => res.status(400).json("Error: " + err))
});




router.delete("/:id", passport.authenticate('jwt', {session: false}) , (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.json("Contact deleted!"))
        .catch(err => res.status(400).json("Error: " + err))
});




module.exports = router;