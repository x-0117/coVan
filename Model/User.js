const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName : {type: String, required : true},
    lastName : {type: String, required : true},
    email : {type: String, required : true, unique : true},
    phoneNumber : {type: String, required : true, unique : true},
    password : {type: String, required : true},
    vaccinated : {type: String, required : true},
    hospitalName : {type: String, required : true},
    hospitalId : {type: String, required : true},
    location : {type: String, required: true},
    date : {type: String, required: true},
    otp : {type: Number, required: true}
})

module.exports = mongoose.model('UserSchema', UserSchema);