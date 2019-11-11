const User = require('../models/user');
const Business = require('../models/business');
const Search = require('../models/search'); 
const Review = require('../models/review');

exports.getUserData = (req, res, next) => {
    User.find()
        .then((users) => {
            res.status(200).json({ users: users })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.postUserData = async (req, res, next) => {
    try {
        const searchData = new Search({
        });
        const searchId = await searchData.save(); 
        const userObj = {...req.body.user, searchId: searchId._id};
        const user = new User(userObj);

        const result = await user.save();

        res.status(201).json({
            message: 'add user success',
            user: result
        });


    } catch (err) {
        next(err);
    };
}

exports.getUserDataById = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
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
        const result = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true })

        if (!result) {
            const error = new Error('Could not find user');
            error.statusCode = 404;
            throw error;
        }

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

        const service = await user.services.id(req.body._id);
        await service.set(req.body);

        const result = await user.save();
        result.services.find((service) => { return service._id === req.body._id });

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

        await user.services.push(req.body);

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


