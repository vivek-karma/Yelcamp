const mongoose = require("mongoose")
var campgroundSchema = new mongoose.Schema({
    name: String,
    img : String,
    price: String,
    description: String,
    author: {
        id :{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        username: String
    },
    comments :[
        
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "comments"
      }
      ]
})

module.exports = mongoose.model("campgrounds", campgroundSchema)
