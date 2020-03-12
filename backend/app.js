const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const cors    = require('cors');

const users = require('./routes/user');
const contacts = require('./routes/contacts');
const allContacts = require('./routes/allContacts');

mongoose.set('useUnifiedTopology', true,);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


const app = express();
app.use(cors());
app.use(passport.initialize());
require('./passport')(passport);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/contacts', contacts);
app.use('/allContacts', allContacts);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});