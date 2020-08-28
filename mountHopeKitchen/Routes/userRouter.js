const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.post(
    '/', 
    async (req, res) => {

    try {

        const newUser = await User.create(req.body);

        res.json({
            msg: "user created successfully",
            document: newUser
        });

    } catch (error) {

        res.status(500)
        .json({error: error.message|| error})
    }

    }
    
)

module.exports = router;