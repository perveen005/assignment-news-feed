var mongoose = require('mongoose'),
Schema = mongoose.Schema

var userSchema = new Schema ({
    email:{
      type : String,
      unique :[true,"Email already exists"],
      trim:[true],
      required:[true,"email not provided"]
    },
    password:{
      type : String,
      required:[true,"password is required"]
    },
    preference:{
      type : [String],
      required :[true ,"need to add preference"]
    },
    created:{
      type:Date,
      default:Date.now
    }
})

module.exports = mongoose.model('User' , userSchema);