var express = require("express"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    passportLocalStragedy = require("passport-local"),
    expressSession = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash = require("connect-flash");
    methodOverride = require("method-override");

var   campground = require("./models/campground"),
      comment = require("./models/comment"),
      user = require("./models/user"),
      privatedata = require("./models/privatedata");


var  campgroundsRoutes = require("./routes/campgrounds"),
     commentsRoutes = require("./routes/comments"),
     indexRoutes = require("./routes/index");

var app = express();

app.set("view engine","ejs")

app.use(flash())
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended:true}))


//mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true})
mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser:true})
//  mongodb://<dbuser>:<dbpassword>@ds141671.mlab.com:41671/vivek_first
//  mongodb://localhost/yelpcamp

// passport configurations
app.use(require("express-session")({
    secret:"this is secret to yelpcamp in express -session",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportLocalStragedy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use(function(req,res,next){
    res.locals.success = req.flash("success");
    res.locals.message = req.flash("message");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
 })



app.use(campgroundsRoutes)
app.use(commentsRoutes)
app.use(indexRoutes)


app.listen(3000,function(){
    console.log("server is running");

})
