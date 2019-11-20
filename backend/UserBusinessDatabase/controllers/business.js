const Business = require('../models/business');
const Search = require('../models/search');
const geolib = require('geolib');

exports.getBusinessData = (req, res, next) => {
    if (req.query.title) {
        const regex = new RegExp(RegExp.escape(req.query.title), 'gi');
        Business.find({ title: regex })
            .then(async (businesses) => { 
                if (!businesses) {
                    const error = new Error('Could not find any Businesses');
                    error.statusCode = 404;
                    throw error;
                } 
            

                const businessScores = businesses.map((business) => {
                    const score = geolib.getDistance({ latitude: req.query.lat, longitude: req.query.long }, { latitude: business.location.lat, longitude: business.location.long });


                    const businessScore ={business:business,score: score};
                    
                    return businessScore;
                });
                
                businessScores.sort((a, b) => Number(a.score) - Number(b.score)); 
                console.log(businessScores);
                const result = businessScores.map((businessScore) => {
                    return businessScore.business;
                });
                res.status(200).json({ businesses: result })
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
        .populate('reviews')
        .exec()
        .then(business => { 
        res.status(200).json({ businesses: business }) 
        }).catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
}

exports.postBusinessData = async (req, res, next) => {

    try {
        const business = new Business(req.body.business);

        await business.save(); 
        const result = await business.populate('reviews').execPopulate();
        
        res.status(201).json({
            message: 'add user success',
            business: result
        });


    } catch (err) {
        next(err);
    };
}

exports.getBusinessDataById = (req, res, next) => {
    const businessId = req.params.businessId;
    Business.findById(businessId)
        .then((business) => {
            if (!business) {
                const error = new Error('Could not find Business');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ business: business })
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
            res.status(200).json({ message: 'deleted', business: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateBusinessData = async (req, res, next) => {
    try {
        const businessId = req.params.businessId;
        const update = await Business.findOneAndUpdate({ _id: businessId }, req.body.business, { new: true })

        if (!update) {
            const error = new Error('Could not find business');
            error.statusCode = 404;
            throw error;
        }
        const business = await Business.findById(businessId);  
        const result = await business.populate('reviews').execPopulate();
        res.status(200).json({ message: 'updated', business: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
