require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const userRoute = require('./routes/User');
const adminRoute = require('./routes/Admin');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(userRoute);
app.use(adminRoute);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0u6lv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true} ).then((response) => {
    console.log("Connected!!")
    app.listen(process.env.PORT || 4000)
}).catch((error) => {
    console.log(error)
})