const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "You are a good boy"



const { query, matchedData, body, validationResult } = require('express-validator');


//route 1
//create user
router.post('/createuser', [

    body('name', "Enter a valid name(length > 3)").isLength({ min: 3 }),
    body('email', "Enter a valid and unique email").isEmail(),
    body('password', "Password length should be more than 5").isLength({ min: 5 }),

], async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, salt)

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
    })
    const data = {
        user: {
            id: user.id
        }
    }
    var token = jwt.sign(data, JWT_SECRET);

    res.json({ token })

})


//route 2
//authenticate the user
router.post('/login', [

    body('email', "Enter a valid and unique email").isEmail(),
    body('password', "Password cannot be blank").exists(),

], async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please Try logging in with the correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please Try logging in with the correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SECRET);
        res.json({ token })

    } catch (err) {
        console.log(err);
    }

})


//route 3
// get user details using post method /api/auth/getUser .Login required

router.post('/getUser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;