const express = require('express');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const router = express.Router();


router.post('/register', async (req, res) => {
    const data = req.body;
    // Validate request parameters
    if (!data.username || !data.email || !data.password) {
        return res.status(400).json({ error: 'Validation failed.', details: ['Username, email, and password are required.'] });
    }

    try {
        // check is use is alradey exist
        const user = await User.findOne({ email: data.email });
        console.log('user', user);
        if (user) {
            return res.status(400).json({ error: 'User already exists.' });

        } else {
            // Create new user

            const newUser = await User.create(data);
            console.log('newUser', newUser);
            const newUserInfo = await UserInfo.create({
                profession: 'Student',
                transaction: [],
                category: [],
                MoneyBox: [],
                userId: newUser._id
            })

            res.status(201).json({ message: 'User registered successfully.', userId: newUser._id.toString() });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password in MongoDB
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        res.json({ message: 'Login successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

router.get('/:email', async (req, res) => {
    // console.log(req.user);
    try {
        // Find user by email in MongoDB
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const userInfo = await UserInfo.findOne({ userId: user._id});
        res.json({ user, userInfo });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }

});

module.exports = router;