const User = require('../models/user'); 
const Business = require('../models/business');

exports.getUserData = (req,res,next) => { 
    User.find() 
        .then(users => { 
            res.status(200).json({users: users})
        }) 
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })
}

exports.postUserData = (req, res, next) => {
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const userName = req.body.userName;
    const user = new User({
        userName: req.body.userName,
        fullName: req.body.fullName,
        profilePic: req.body.profilePic,
        following: req.body.following,
        address: req.body.address,
        birthday: req.body.birthday,
        reviews: req.body.reviews,
        services: req.body.services, 
    });
    
    user
        .save()
        .then(result => {
            res.status(201).json({
                message: 'add user success', 
                user: result
            });
        })
        .catch(err => {
            console.log(err); 
            next(err);
        });
} 

exports.getUserDataById = (req,res,next) => {  
    const userId = req.params.userId;
    User.findById(userId) 
        .then(user => { 
            if(!user){ 
                const error = new Error('Could not find user'); 
                error.statusCode = 404; 
                throw error;
            } 
            res.status(200).json({user: user})
        })
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })
}; 

exports.deleteUser = (req,res,next) => { 
    const userId = req.params.userId; 
    User.findById(userId) 
    .then(user => { 
        if(!user){ 
            const error = new Error('Could not find user'); 
            error.statusCode = 404; 
            throw error;
        } 
        return User.findByIdAndDelete(userId);
    }) 
    .then( result => { 
        res.status(200).json({message: 'deleted', user: result});
    })
    .catch(err => { 
        if(!err.statusCode){ 
            err.statusCode = 500;
        }
        next(err);
    }) 
}

exports.updateUserData = (req,res,next) => { 
    const userId = req.params.userId; 
    const userName = req.body.userName; 
    const firstName = req.body.firstName; 
    const lastName = req.body.lastName; 
    User.findById(userId) 
        .then(user => { 
            if(!user){ 
                const error = new Error('Could not find user'); 
                error.statusCode = 404; 
                throw error;
            } 
            user.userName = req.body.userName;
            user.fullName = req.body.fullName;
            user.profilePic = req.body.profilePic;
            user.following = req.body.following;
            user.address = req.body.address;
            user.birthday = req.body.birthday;
            user.reviews = req.body.reviews;
            user.services = req.body.services;
            return user.save();
        
        })  
        .then( result => { 
            res.status(200).json({message: 'updated', user: result});
        })
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })

}