const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const connectToMongoDb = require('./config/mongoDb');
const routes = require('./routes')
const cors = require("cors")

dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000
connectToMongoDb()

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Chat app listening on http://localhost:${PORT}`);
});