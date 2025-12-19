const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AllUser= require('../models/AllUser');


const registerUserController = async(req, res)=>{
    try {
        const { username, email, password, role } = req.body;

        const checkUserExists = await AllUser.findOne({$or : [{username}, {email}]});
        if (checkUserExists) {
            return res.status(400).json({
                success : false,
                message : 'User with same username or email already exists'
            });
        }

        const bcryptSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);


        const newUser = new AllUser({
            username,
            email,
            password : hashedPassword, 
            role
        });
        await newUser.save();

        if (newUser) {
                return res.status(200).json({
                success : true, 
                message : 'User Registed Successfully',
                user : newUser
            });
        }

        res.status(400).json({
            success : false,
            message : "Unable to register User, Please Try Again"
        });


    } catch(error) {
         return res.status(500).json({
            success: false,
            message : "Registration of User Failed, Please Try Again"
        });
    }
};

const loginUserController = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const userDetails = await AllUser.findOne({email});

        if (!userDetails) {
            return res.status(404).json({
                success : false,
                message : 'User does not exist with this email'
            });
        }

        const verifyPassword = await bcrypt.compare(password, userDetails.password);
        if (!verifyPassword) {
            return res.status(401).json({
                success : false,
                message : 'Incorrect Password'
            });
        }

        const accessToken = jwt.sign({
            userId : userDetails._id,
            username : userDetails.username,
            email : userDetails.email,
            role : userDetails.role
        }, process.env.JWT_SECRET_KEY, { expiresIn : process.env.JWT_ACCESS_TOKEN_TIMEOUT });

        res.status(200).json({
            success : true,
            message : 'User Logged In Successfully',
            accessToken : accessToken
        });

    } catch(error) {
         return res.status(500).json({
            success: false,
            message : "Login Failed"
        });
    }
};

const changePasswordController = async (req, res) => {
    try {
        const userId = req.loggedInUserInfo.userId;

        const userDetails = await AllUser.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success : false,
                message : "User Not Exists"
            });
        }

        const {oldPassword, newPassword}  = req.body;

        const compareReqAndDBPassword = await bcrypt.compare(oldPassword, userDetails.password);
        
        if (!compareReqAndDBPassword) {
            return res.status(400).json({
                success : false,
                message : "Old Password is Incorrect!"
            });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({
                success : false,
                message : "New Password cannot be same as Old Password"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        // we can update password in two ways, simpler way is to using 'userDetails' variable which refers to the user who found using findById, as it returns the reference for that object instead of data.
        /*
        const updatedUserDetails = await AllUser.findByIdAndUpdate(userId, {
            password : newHashedPassword
        }, {
            new : true
        });
        */
       // So we can change the password in reference variable which is 'userDetails'
       userDetails.password = newHashedPassword;
       await userDetails.save();

        res.status(200).json({
            success : true,
            message : "Password changed successfully"
        });

    } catch(error) {
        console.log("Error Occured is: ", error);
        return res.status(500).json({
            success : false,
            message : "Error Occured while changing password"
        });
    }
};


module.exports = {
    registerUserController,
    loginUserController, 
    changePasswordController
};