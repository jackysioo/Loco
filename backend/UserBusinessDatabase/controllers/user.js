const User = require('../models/user');
const Business = require('../models/business'); 
const Suggestion = require('../models/suggestion');
const Search = require('../models/search');
const Review = require('../models/review'); 
const JWT = require('jsonwebtoken');  
const {JWT_SECRET} = require('../configuration/index'); 
const Engine = require('../recEngine/engine'); 

const e = new Engine(); 

createToken = user => { 
   return JWT.sign({ 
        iss: 'LOCO', 
        sub: user._id, 
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
} 

exports.signIn = async (req,res,next) => { 
    const token = createToken(req.user); 
    res.status(200).json({token});

}

exports.signUp = async (req, res, next) => {
    try {
        const searchData = new Search({
        });
        const searchId = await searchData.save(); 

        const foundUser = await User.findOne({username : req.body.user.username}); 
        if(foundUser){ 
            return res.status(403).json({
                error: 'userame already in use',
            });
        }

        const userObj = { ...req.body.user, searchId: searchId._id };
        const user = new User(userObj);

        const result = await user.save(); 

        const token = createToken(user);
        
        res.status(201).json({
            message: 'add user success',
            user: result, 
            token: token
        });


    } catch (err) {
        next(err);
    };
}

exports.getUserData = (req, res, next) => {
    User.find()
        .populate('reviews')
        .exec()
        .then(users => { 
        res.status(200).json({ users: users }) 
        }).catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}


exports.getUserDataById = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId) 
        .populate('reviews') 
        .exec()
        .then((user) => {
            if (!user) {
                const error = new Error('Could not find user');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ user: user })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
        .then((user) => {
            if (!user) {
                const error = new Error('Could not find user');
                error.statusCode = 404;
                throw error;
            }
            return User.findByIdAndDelete(userId);
        })
        .then((result) => {
            res.status(200).json({ message: 'deleted', user: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateUserData = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const update = await User.findOneAndUpdate({ _id: userId }, req.body.user, { new: true })

        if (!update) {
            const error = new Error('Could not find user');
            error.statusCode = 404;
            throw error;
        }
         const user = await User.findById(userId);  
         const result = await user.populate('reviews').execPopulate();
        res.status(200).json({ message: 'updated', user: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}





exports.updateService = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        const service = await user.services.id(req.body.service._id);
        await service.set(req.body.service);

        const result = await user.save();
        result.services.find((service) => { return service._id === req.body.service._id });

        res.status(200).json({ message: 'updated', service: service });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addService = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        await user.services.push(req.body.service);

        const result = await user.save();
        const service = result.services[result.services.length - 1];

        res.status(200).json({ message: 'updated', service: service });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
} 

exports.getSuggestions = async (req, res, next) => {
    try {
        const userId = req.params.userId; 
       await e.similars.update(userId); 
       await e.suggestions.update(userId); 
        const suggestions = await Suggestion.findOne({user: userId}).populate('suggestions.business').exec();

        res.status(200).json({ message: 'updated', suggestions: suggestions.suggestions });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


