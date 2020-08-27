require('dotenv').config(); 

const express = require('express'), //requiring all of the dependancies

    server = express(),

    morgan = require('morgan'),

    mongoose = require('mongoose'),

    port = process.env.PORT || 3001,

    deprecatedObj = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, //What does this mean again?

    connectionURI = process.env.MONGO;

    // homeRouter = require('./routes/homeRouter');

    server.use(morgan('dev'));

    server.use(express.json());

    // server.use('/', homeRouter);

    mongoose.connect(connectionURI, deprecatedObj, () => {

        console.log('The Server Is Connected To The Database')

    })

    mongoose.connection.on('error', (err) => {

        console.log('An error occured trying to connect to MongoDB, Error: ' + err);
    })

    mongoose.connection.on('connected', () => {

        console.log('The Server is attempting to connect to the database...')
    })

    server.listen(port, () => {

        console.log('Server listening on Port: ' + port);

    })









