const User = require('../models/user');
const Business = require('../models/business');
const Search = require('../models/search');

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
        const user = new User({
            userName: req.body.userName,
            fullName: req.body.fullName,
            profilePic: req.body.profilePic,
            following: req.body.following,
            address: req.body.address,
            birthday: req.body.birthday,
            reviews: req.body.reviews,
            services: req.body.services,
            searchId: searchId._id
        });

        const result = await user.save();

        res.status(201).json({
            message: 'add user success',
            user: result
        });


    } catch (err) {
        console.log(err);
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

exports.updateReviewService = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (req.body.reviews) {
            req.body.reviews.forEach(async (review) => {

                const result = await User.findOneAndUpdate({ _id: userId, "reviews._id": "review._id" }, review, { new: true, upsert: true });
                if (!result) {
                    const error = new Error('Could not find user');
                    error.statusCode = 404;
                    throw error;
                }

            });
        }  
        if (req.body.services) {
            req.body.services.forEach(async (service) => {

                const result = await User.findOneAndUpdate({ _id: userId, "services._id": "service._id" }, service, { new: true, upsert: true });
                if (!result) {
                    const error = new Error('Could not find user');
                    error.statusCode = 404;
                    throw error;
                }

            });
        } 


        res.status(200).json({ message: 'updated', user: User.findById(userId) });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}
