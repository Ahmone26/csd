const mongoose = require("mongoose");

// setting contact Schema

const contactSchema = new mongoose.Schema({

    name: { type: String, required: true},
    lastname: { type: String, required: true,},
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true},
    company: { type: String, required: true},
    adress: { type: String, required: true},
}, {
    timestamps: true 
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;