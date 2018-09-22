var campground = require("../models/campground")
var comment = require("../models/comment")
var middleware ={};

middleware.isAuthorizedForCampground = function(req,res,next){
    if(req.isAuthenticated()){
        // does have permissions
        campground.findById(req.params.id,function(err,found){
        
            if(err){
                res.redirect("back")
            }else{
                
                // render this page only user have authorization
                if(found.author.id.equals(req.user._id)){
                    next()       
                }else{
                res.redirect("back")
                }
            }
    })
    }else{
        res.redirect("back")
    }
}

middleware.isAuthorizedForComment = function(req,res,next){
    if(req.isAuthenticated()){
        // does have permissions
        comment.findById(req.params.comment_id,function(err,foundComment){
        
            if(err){
                res.redirect("back")
            }else{
                
                // render this page only user have authorization
                if(foundComment.author.id.equals(req.user._id)){
                    next()       
                }else{
                res.redirect("back")
                }
            }
    })
    }else{
        res.redirect("back")
    }
}


middleware.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to Login first !!!")
    res.redirect("/login")
}

module.exports = middleware;