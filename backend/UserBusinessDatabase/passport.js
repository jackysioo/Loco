const passport = require('passport'); 
const JwtStrategy = require('passport-jwt').Strategy; 
const {ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('./configuration/index'); 
const User = require('./models/user');  
const LocalStrategy = require('passport-local');

passport.use(new JwtStrategy({ 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
    secretOrKey: JWT_SECRET
}, async (payload,done) => { 
    try{ 
        const user =  await User.findById(payload.sub); 

        if(!user){ 
            return done(null,false);
        }


        done(null,user);

    }catch(error){ 
        done(error,false);
    }



})); 

passport.use(new LocalStrategy({ 
    usernameField: 'username'
}, async(username,password,done) => { 
    try{ 
        const user = await User.findOne({username}); 

    if(!user){ 
        return done(null,false);
    }
    const isMatch = await user.isValidPassword(password); 
    if(!isMatch){ 
        return done(null,false);
    }
    done(null,user);
    }catch(error){ 
        done(error,false);
    }
}));