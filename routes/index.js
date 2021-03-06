var express = require("express")
var router = express.Router()
var user = require("../models/user"),
    privatedata = require("../models/privatedata"),
    passport = require("passport");


// landing route..............................
router.get("/",function (req,res) {

    res.render("landing")
})


//=================
// passport routes
//=================



// register routes...............

router.get("/register",function(req,res){
    res.render("register")
})

router.post("/register",function(req,res){

    privatedata.create(req.body)

    var newUser = new user({username:req.body.username})
    user.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err.message)
            req.flash("error",err.message)
            return res.redirect("/register")
        }

        passport.authenticate("local")(req,res, function(){
            req.flash("success","Welcome "+user.username+" to YelpCamp !!!")
            res.redirect("/camgrounds")
        })
    })

})

// login routes.....................

router.get("/login",function(req,res){

    res.render("login")
})

router.post("/login",
    passport.authenticate("local",{
        successRedirect:"/camgrounds",
        failureRedirect:"/login"
    }),function(){})


//logout route...........
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","log you out!!!")
    res.redirect("/camgrounds")
})




module.exports = router
