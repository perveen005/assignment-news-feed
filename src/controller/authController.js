var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

var register = (req, res) => {
  const user = new User({
    email: req.body.email,
    preference : req.body.preference,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save()
    .then((data) => {
     return res.status(200).send({
        message: "user registered successfully",
      });
    })
    .catch((err) => {
     return res.status(500).send({
        message: err,
      });
    });
};
var logIn =(req,res) =>{
    User.findOne({
        email : req.body.email
    }).then((user)=>{
      if(!user){
        return res.status(404).send({
            accessToken : null,
            message:"User not found"
        })
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
      if(!passwordIsValid){
      return res.status(401).send({
        accessToken:null,
        message : "invalid password entered"
      })}
      var token = jwt.sign({
        id : user.id
      },process.env.API_SECRET,{
        expiresIn : 86400
      });
      return res.status(200).send({
        user:{
            id : user._id,
            email : user.email
        },
        message : "Login",
        accessToken:token
      })
    }).catch(err => {
        return res.status(500).send({
            message : err
        })
    })
}
module.exports ={register,logIn};