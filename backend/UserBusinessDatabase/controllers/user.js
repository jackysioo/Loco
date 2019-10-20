const User = require('../models/user'); 

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

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        userName: userName
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

exports.deletePost = (req,res,next) => { 
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
        res.status(200).json({message: 'deleteed', user: result});
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
            user.userName = userName; 
            user.firstName = firstName; 
            user.lastName = lastName;
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