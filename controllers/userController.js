const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const nodemailer = require("nodemailer")
const { request } = require('express')


const registerUser = asyncHandler(async (req, res) => {
    const { name, password, email, age, gender, dob, bloodGroup, address, healthCond } = req.body

    if (!name || !password || !email || !age || !gender || !dob || !bloodGroup || !address) {
        res.statusCode = 400
        throw new Error('Please add all fields')
    }

    //if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.statusCode = 400;
        throw new Error("user already exists")

    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //createe user
    const users = await User.create({
        name, password: hashedPassword, email, age, gender, dob, bloodGroup, address, healthCond

    })

    if (users)
        res.status(201).json({
            name: users.name,
            _id: users.id,
            email: users.email,
            token: generateToken(users.id)
        })
    else {
        res.status(400)
        throw new Error('inalid user data')
    }

})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            name: user.name,
            _id: user.id,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error('inalid credential')
    }

})

const resetPass = asyncHandler(async (req, res) => {

    const pass = req.body.password;
    const email = req.body.email
    const user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)
    const filter = { "email": email }
    const update1 = { password: hashedPassword };
    await User.findOneAndUpdate(filter, update1);

    res.send("password reset successfully")
})

const changeAddress = asyncHandler(async (req, res) => {
    const ad2 = req.body.address2;
    const email = req.body.email
    const user = await User.findOne({ email });

    const filter = { "email": email }
    const update1 = { address2: ad2 };
    await User.findOneAndUpdate(filter, update1);
    res.send("address changed...")


})
const getAddress = asyncHandler(async (req, res) => {
    const email = req.params.email
    const user = await User.findOne({ email });
    res.send(user.address)
})

const foregtPass = asyncHandler(async (req, res) => {
    const eid = req.params.email;
    const msg = {
        from: "telstrakafkanetworking2@gmail.com",
        to: eid,
        subject: "Reset your account password",
        html: "<h4>Hello " + eid + "<br/>Please click on below link to reset your password.</h4>"

    };
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "telstrakafkanetworking2@gmail.com",
            pass: "yznqnswnzohcdisw",
            port: 465,
            host: "smtp.gmail.com"
        }
    }).sendMail(msg, (err) => {
        if (err)
            return console.log("error", err)
        else return console.log("sent")
    })

})

const getme = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name, email
    })

})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = {
    registerUser, loginUser, getme, foregtPass, resetPass, changeAddress, getAddress
}