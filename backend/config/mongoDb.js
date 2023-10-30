const mongoose = require("mongoose");

// db
const connectToMongoDb = () => {
    const MONGOURI = "mongodb://127.0.0.1:27017/chatApp"
    mongoose.connect(MONGOURI)
        .then(() => {
            console.log(`Connected to MongoDB at ${MONGOURI}`);
        })
        .catch((error) => {
            console.error(`Error connecting to MongoDB at ${MONGOURI}:`, error);
        });
}

module.exports = connectToMongoDb