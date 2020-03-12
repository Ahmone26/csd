const express = require('express');
const router = express.Router();
const passport = require('passport');
const Contact = require("../models/Contact");

// routes for add new contact, finding by id, finding by id and updating


router.post("/add",passport.authenticate('jwt', {session: false}), function(req, res) {
   
    const newContact = new Contact({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        number: req.body.number,
        company: req.body.company,
        adress: req.body.adress
    });

    console.log(newContact);
    newContact.save()
        .then(() => res.json("Contact added!"))
        .catch(err => res.status(400).json("Error: " + err))

});

router.get("/:id", passport.authenticate('jwt', {session: false}) ,(req, res) => {
    Contact.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json("Error: " + err))
});

router.post("/:id/update",passport.authenticate('jwt', {session: false}), (req, res) => {
    Contact.findById(req.params.id)
      .then(contact => {
          contact.name = req.body.name;
          contact.lastname = req.body.lastname;
          contact.email = req.body.email;
          contact.number = Number(req.body.number);
          contact.company = req.body.company;
          contact.adress = req.body.adress;

          contact.save()
            .then(() => res.json("Contact updated!"))
            .catch(err => res.status(400).json("Error: " + err))
      })
      .catch(err => res.status(400).json("Error: " +err))
});

module.exports = router;