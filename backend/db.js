const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://new-user1234:user1234@cluster0.cqjlfzy.mongodb.net/FinSecure?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;

