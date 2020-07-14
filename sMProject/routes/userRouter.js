const express = require('express');

const router = express.Router(); //We are creating an instance of the Express Router Class, which is an object.

const User = require('../models/User');  //MongoDB collection is accessible through this variable

router.post('/post',
//validator
async (req, res) => {

    try {
        const newUser = await User.create(req.body);

        await newUser.save()

        res.json({

            status: 201,
            new_user: newUser,
            message: 'New User Added To the Database'
        })
        
    } catch (err) {

        console.log(err.message);
        
        res.json({
            message: 'An Error Occured During Post Request',
            error: err.message,
            status: 500
        })
    }

console.log(req.body)
})

module.exports = router;