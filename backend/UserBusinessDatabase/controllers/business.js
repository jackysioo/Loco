const Business = require('../models/business'); 

exports.getBusinessData = (req,res,next) => {  
    if(req.query.businessName){ 
        Business.find({businessName: req.query.businessName}) 
        .then(business => { 
            res.status(200).json({Business: business})
        }) 
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })
    } 
    else{
    Business.find() 
        .then(business => { 
            res.status(200).json({Business: business})
        }) 
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        }) 
    }
}

exports.postBusinessData = (req, res, next) => {
    const email = req.body.email;
    const businessName = req.body.businessName;
    const business = new Business({
        email: email,
        businessName: businessName,
    });
    
    business
        .save()
        .then(result => {
            res.status(201).json({
                message: 'add Business success', 
                Business: result
            });
        })
        .catch(err => {
            console.log(err); 
            next(err);
        });
} 

exports.getBusinessDataById = (req,res,next) => {  
    const businessId = req.params.businessId;
    Business.findById(businessId) 
        .then(business => { 
            if(!business){ 
                const error = new Error('Could not find Business'); 
                error.statusCode = 404; 
                throw error;
            } 
            res.status(200).json({Business: business})
        })
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })
}; 

exports.getBusinessDataByName = (req,res,next) => {  
    const businessName = req.params.businessName;
    Business.find({businessName: businessName}) 
        .then(business => { 
            if(!business){ 
                const error = new Error('Could not find Business'); 
                error.statusCode = 404; 
                throw error;
            } 
            res.status(200).json({Business: business})
        })
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })
}; 

exports.deleteBusiness = (req,res,next) => { 
    const businessId = req.params.businessId; 
    Business.findById(businessId) 
    .then(business => { 
        if(!business){ 
            const error = new Error('Could not find Business'); 
            error.statusCode = 404; 
            throw error;
        } 
        return Business.findByIdAndDelete(businessId);
    }) 
    .then( result => { 
        res.status(200).json({message: 'deleted', Business: result});
    })
    .catch(err => { 
        if(!err.statusCode){ 
            err.statusCode = 500;
        }
        next(err);
    }) 
}

exports.updateBusinessData = (req,res,next) => { 
    const businessId = req.params.businessId; 
    const businessName = req.body.businessName; 
    const email = req.body.email; 
 
    Business.findById(businessId) 
        .then(business => { 
            if(!business){ 
                const error = new Error('Could not find Business'); 
                error.statusCode = 404; 
                throw error;
            } 
            business.businessName = businessName; 
            business.email = email; 
            return business.save();
        
        })  
        .then( result => { 
            res.status(200).json({message: 'updated', Business: result});
        })
        .catch(err => { 
            if(!err.statusCode){ 
                err.statusCode = 500;
            } 
            next(err);
        })

}