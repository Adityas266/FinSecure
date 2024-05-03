const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const UserInfo = require('../models/UserInfo');
const User = require('../models/User');

router.put('/:id', async (req, res) => {
    try {
        const data = req.body;
        const transaction = await Transaction.findById(req.params.id);
        transaction.amount = data.amount;
        transaction.acc = data.acc;
        transaction.transaction_type = data.transaction_type;
        transaction.category = data.category;
        transaction.date = data.date;
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Transaction.deleteOne({ _id: req.params.id});
        res.status(201).send('success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
})


router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    const userId = await User.findOne({ email: data.email });
    console.log(userId)
    if (!userId) {
        res.status(500).json({ error: 'User not found.' });
        return;
    }
    const userInfo = await UserInfo.findOne({ userId: userId._id });
    try {
        const transaction = await Transaction.create({
            amount: data.amount,
            acc: data.acc,
            date: data.date,
            category: data.category,
            transaction_type: data.transaction_type
        });
        userInfo.transaction.push(transaction._id);
        await userInfo.save();
        res.status(201).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

router.get('/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    const userInfo = await UserInfo.findOne({ userId: user._id });
    const transactions = await Transaction.find({ _id: { $in: userInfo.transaction } }).populate('category').sort('-date')
    try {
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

module.exports = router;