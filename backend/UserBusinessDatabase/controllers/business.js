const Business = require('../models/business');
const Search = require('../models/search');
const geolib = require('geolib');

exports.getBusinessData = (req, res, next) => {
    if (req.query.title) {
        const userSearchDataSearch = Search.findById(req.query.userId);
        const regex = new RegExp(RegExp.escape(req.query.title), 'gi');
        Business.find({ title: regex })
            .then((businesses) => { 
                if (!businesses) {
                    const error = new Error('Could not find any Businesses');
                    error.statusCode = 404;
                    throw error;
                }
                const businessScores = businesses.map((business) => {
                    const score = Math.abs(userSearchDataSearch.distance -
                        geolib.getDistance({ latitude: req.query.lat, longitude: req.query.long }, { latitude: business.lat, longitude: business.long }))
                        + Math.abs(userSearchDataSearch.rating - business.rating)
                        + Math.abs(userSearchDataSearch.price - business.price);

                    businessScores.business = business;
                    businessScores.score = score;
                    return businessScores;
                });
                businessScores.sort((a, b) => Number(b.score) - Number(a.score));
                const result = businessScores.map((businessScore) => {
                    return businessScore.business;
                });
                res.status(200).json({ Business: result })
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }
    else {
        Business.find()
            .then((business) => {
                res.status(200).json({ Business: business })
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }
}

exports.postBusinessData = (req, res, next) => {

    const business = new Business({
        title: req.body.title,
        user: req.body.user,
        about: req.body.about,
        profilePic: req.body.profilePic,
        images: req.body.images,
        rating: req.body.rating,
        region: req.body.region,
        location: req.body.location,
        price: req.body.price,
        tags: req.body.tags,
        reviews: req.body.reviews
    });

    business
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'add Business success',
                Business: result
            });
        })
        .catch((err) => {
            next(err);
        });
}

exports.getBusinessDataById = (req, res, next) => {
    const businessId = req.params.businessId;
    Business.findById(businessId)
        .then(business => {
            if (!business) {
                const error = new Error('Could not find Business');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ Business: business })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.deleteBusiness = (req, res, next) => {
    const businessId = req.params.businessId;
    Business.findById(businessId)
        .then((business) => {
            if (!business) {
                const error = new Error('Could not find Business');
                error.statusCode = 404;
                throw error;
            }
            return Business.findByIdAndDelete(businessId);
        })
        .then((result) => {
            res.status(200).json({ message: 'deleted', Business: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateBusinessData = (req, res, next) => {
    const businessId = req.params.businessId;

    Business.findById(businessId)
        .then((business) => {
            if (!business) {
                const error = new Error('Could not find Business');
                error.statusCode = 404;
                throw error;
            }
            business.title = req.body.title;
            business.user = req.body.user;
            business.about = req.body.about;
            business.profilePic = req.body.profilePic;
            business.images = req.body.images;
            business.rating = req.body.rating;
            business.region = req.body.region;
            business.location = req.body.location;
            business.price = req.body.price;
            business.tags = req.body.tags;
            business.reviews = req.body.reviews;
            return business.save();

        })
        .then((result) => {
            res.status(200).json({ message: 'updated', Business: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
