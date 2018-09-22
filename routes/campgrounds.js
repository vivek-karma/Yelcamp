var express = require("express")
var router = express.Router()

var campground = require("../models/campground"),
    comment = require("../models/comment"),
    middleware = require("../middleware")
    
    
    
// routing starts here.........................
// home routes


router.get("/camgrounds",function(req,res){
    
        campground.find({},function(err,cg){
        
        if(err){
            console.log(err);
            
        }
        else{
            res.render("campground/camground",{camgrounds:cg})
        }
    })
  
})

router.get("/camgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            console.log(err)
        }else{
            console.log(found)
            res.render("campground/show",{campground:found})
        }
    })
})

router.get("/addnew",middleware.isLoggedIn, function(req, res){
    
    res.render("campground/new")
})

router.post("/camgrounds",middleware.isLoggedIn,function(req,res){
    var name = req.body.name
    var img = req.body.img
    var description = req.body.description
    var author = {
        id:req.user._id,
        username: req.user.username
    }
    var newcamground = {name :name, img :img, description:description, author:author }
    
    campground.create(newcamground,function(err,newlycg){
        if(err){
            console.log(err);
            
        }
        else{
            //console.log(newlycg)
            res.redirect("/camgrounds")
        }
    })
    
})

router.get("/camgrounds/:id/edit",middleware.isAuthorizedForCampground,function(req,res){
     campground.findById(req.params.id,function(err,found){
         res.render("campground/edit",{campground:found})
     })
         
    
})

router.put("/camgrounds/:id",middleware.isAuthorizedForCampground,function(req,res){
    campground.findOneAndUpdate(req.params.id,req.body.campground,function(err,updated){
        if(err){
            console.log(err)
        }else{
            res.redirect("/camgrounds/"+req.params.id)
        }
    })
})


// destroy route.............
router.delete("/camgrounds/:id",middleware.isAuthorizedForCampground,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/camgrounds")
        }
        res.redirect("/camgrounds")
    })
})



module.exports = router