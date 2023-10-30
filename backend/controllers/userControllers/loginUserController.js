const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user data from the database, excluding the password field
        const userData = await User.findOne({ email: email });

        if (!userData) {
            return res.json({ message: "User not found - or invalid credentials" });
        }

        // Compare hashed password
        const passwordCompare = await bcrypt.compareSync(password, userData.password);

        // i get this in response here:


        if (!passwordCompare) {
            return res.json({ message: "User not found - or invalid credentials" });
        }

        // If password matches, send token, isOnline true
        // Extracting password and rest of the user data
        const { password: hashedPassword, ...userWithoutPassword } = userData.toObject();
        const { JWT_SECRET } = process.env
        const authtoken = jwt.sign({ email: userData.email }, JWT_SECRET);
        
        await User.findByIdAndUpdate(userData._id, { isOnline: true });
        return res.json({
            message: "Login successful",
            token: authtoken, 
            user: userWithoutPassword
        });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred", error: error.message });
    }
};

module.exports = loginUserController;
