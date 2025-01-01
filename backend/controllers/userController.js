
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { Error } = require('mongoose')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

     //Hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPasssword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPasssword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
        
    }  else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc Authonticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    res.json({Message: 'Login User'})
})

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async(req, res) => {
    res.json({Message: 'User data'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}