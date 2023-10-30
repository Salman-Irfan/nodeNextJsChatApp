const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const multer = require('multer');
const router = express.Router();
const path = require('path');
const registerUserController = require('../controllers/userControllers/registerUserController');
const loginUserController = require('../controllers/userControllers/loginUserController');
const logoutUserController = require('../controllers/userControllers/logoutUserController');
const isLogin = require('../middlewares/authMiddlewares/isLogin');

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { SESSION_SECRET } = process.env


// static folder path
app.use(express.static('public'));

const storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    // fileName
    filename: function (req, file, cb) {
        const name = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        cb(null, name)
    },
});

const upload = multer({
    storage: storage
})

// auth - register
router.post('/auth/register', upload.single('image'), registerUserController)
// auth - login
router.post('/auth/login', loginUserController)
// auth - logout
router.get('/auth/logout', isLogin ,logoutUserController)
// router.get('register')

module.exports = router