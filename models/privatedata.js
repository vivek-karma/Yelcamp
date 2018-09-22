var mongoose = require("mongoose")

var newPrivateSchema = new mongoose.Schema({
    username : String,
    password: String
})

module.exports = mongoose.model("privatedata",newPrivateSchema)