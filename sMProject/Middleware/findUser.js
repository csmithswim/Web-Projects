let User = require('../models/User'); //Creating 

async function findUser(req, res, next) { //This is async because we are accessing the database/mongodb. 

    try {
        const id = req.params.userId;

        let foundUser = await User.find({_id: id});

    if (foundUser.length == 0 ) {

        res.status(404).json({
            status: 404,
            message: 'No user with the given ID'
        })
    } else {

            foundUser = foundUser[0];

            req.foundUser = foundUser;

        next()
    }
    } catch (err) {

        res.status(500).json({
            status: 500,
            message: err.message,
            full_report: err
        })

    }
}

module.exports = findUser;