const express = require('express');
const User = require('../../models/userModel');

const logoutUserController = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });
        // isOnline = false
        if (user) {
            await User.findByIdAndUpdate(user._id, { isOnline: false }); // Update isOnline to false
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
        // sending response
        return res.json({
            message: 'Logout successful',
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};

module.exports = logoutUserController;
