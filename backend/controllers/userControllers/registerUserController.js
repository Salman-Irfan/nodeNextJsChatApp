const User = require('../../models/userModel')
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const registerUserController = async (req, res) => {
    const {name, email, password} = req.body
    const image = req.file.filename
    // chacking the validations results
    let success = false
    // if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // check whether the user with this email exists already
        let user = await User.findOne({ email: email });
        if (user) {
            return res
                .status(400)
                .json({ success, error: "user with this email already exists" });
        }
        // hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            image: 'images/' + req.file.filename
        });
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = registerUserController