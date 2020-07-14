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


router.get('/all', async (req, res) => { //localhost.../user/all

    try {
    
        const allUsers = await User.find({})
    
        let Json;
    
        if (allUsers.length == 0){
            Json = {
                status: 200,
                message: 'No users were found', 
            }
    
        } else {
            Json = {
                status: 200,
                message: 'All Users were found',
                users: allUsers
            };
        }

        res.status(200).json(Json);
    }
     
     catch (err){
    
        res.status(500).json({
            status: 500,
            message: 'An error occured',
            error: err.message,
            full_report: err
        })    
    }
    
    }) 

//delete request
router.delete('/delete/:userId', findUser, async (req, res) => { //We use async so we can use the await keyword and allow a line to be run sync.

    console.log(req.params)

    try {

        const report = await User.findByIdAndDelete(req.params.userId); //req is an object, param is an object whenever a request is made, populated by key value pairs with the endpoint we create.
        console.log(report);

        res.status(200).json({
            status: 200, 
            deleted_user: req.foundUser
        })

    } catch (err) {

        console.log('Error in HomeRouter: '+ err.message)

        res.status(500).json({
            status: 500,
            message: err.message
        })

    }

 
    res.status(200).json({
        status: 200,
        delete_user: req.found
    })
})

//request patch
router.patch('/patch/:userId', findUser, async (req, res) => {

    const id = req.params.userId;

    const newVersion = req.foundUser.__v + 1; //the version of the document should only be handled by the server/mongoDB

    req.body.__v = newVersion; //this is an interger

    try 
    
    {
        await User.update({_id: id}, req.body);

    const updateDocument = await User.findById(id);

    res.status(200).json({
        status: 200, 

        new_document: updateDocument,
        old_document: req.foundUser

    })

    }   catch (err) {

        console.log('Error in HomeRouter: '+ err.message)

        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

//request User by DB id
router.get('/:userId', findUser, (req, res) => {

res.status(200).json({
  status:200, 
  message: 'A user was found', 

  user: req.foundUser
})

})

module.exports = router;




