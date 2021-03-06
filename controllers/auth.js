const { body } = require("express-validator");
const User = require('../models/user')
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signup = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        }) 
    }

    const user = new User(req.body)
    user.save((err, user)=>{
            if(err){
                return res.status(400).json({
                    "err" : "NOT able to Save user in DB" 
                })
            }
            res.json({
                user : user.name,
                email : user.email,
                id : user._id
            });
    })
};

exports.signin = (req,res) => {

    const errors = validationResult(req)

    const {email , password} = req.body;
    
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    User.findOne({email}, (err,user) => {
        if(err || !user){
           return res.status(400).json({
                error:  "USER does Not Exists"
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error : "Email and Password do not match"
            })
        }
        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        
        //put token in cookie
        res.cookie("token", token, {expire : new Date() + 9999});

        //send response to Front End

        const {_id,name,email,role} = user
        return res.json({token, user : {_id, name, email, role}})

    })

};

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({message: "Signout successful"})
};


//protected routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
})