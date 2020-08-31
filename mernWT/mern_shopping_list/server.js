const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //take requests and get data from the body

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

deprecatedObj = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},


// Connect to Mongo
mongoose
    .connect(db, deprecatedObj) //This is promise based
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));