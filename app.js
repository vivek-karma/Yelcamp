

var express = require("express"),
     app = express(),
     cookieParser = require("cookie-parser"),
     flash = require("connect-flash");
     
var     bodyParser = require("body-parser"), 
     mongoose = require("mongoose"),
    campground = require("./models/campground"),
    comment = require("./models/comment"),
    seedDb = require("./seeds.js"),
    
    passport = require("passport"),
    passportLocal = require("passport-local"),
    expressSession = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    user = require("./models/user"),
    methodOverride = require("method-override"),
    privatedata = require("./models/privatedata");
    


var  campgroundsRoutes = require("./routes/campgrounds"),
     commentsRoutes = require("./routes/comments"),
     indexRoutes = require("./routes/index")
     

app.use(flash())
app.use(express.static(__dirname+"/public"))
app.set("view engine","ejs")

mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser:true})

app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended:true}))




// passport configurations
app.use(require("express-session")({
    secret:"this is secret to yelpcamp in express -session",
    resave:false,
    
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportLocal(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use(function(req,res,next){
    
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user;
 next();
 })
 


app.use(campgroundsRoutes)
app.use(commentsRoutes)
app.use(indexRoutes)
 
 
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server is working -- ver 3");
    
})