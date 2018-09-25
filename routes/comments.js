
//==========================================================
//comments routes
//==========================================================

var express = require("express")
var router = express.Router()
var middleware = require("../middleware")

var campground = require("../models/campground"),
    comment = require("../models/comment");

router.get("/camgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,found){
        if(err){
            console.log(err)
        }else{
            res.render("comment/new",{campground:found})
        }
    })

})

router.post("/camgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err, found) {
        if(err){
            console.log(err)
        }else{
            comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    // add id and user to comments
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    //save comments
                    comment.save()
                    found.comments.push(comment)
                    found.save()
                    req.flash("success","comment added Successfully")
                    res.redirect("/camgrounds/"+found._id)
                }
            })
        }
    })
})

// edit comment route.........

router.get("/camgrounds/:id/comments/:comment_id/edit",middleware.isAuthorizedForComment, function(req,res){
    comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err){
        res.send(err)
    }else{
    res.render("comment/edit",{campground_id: req.params.id, comment: foundComment})

    }

})
})

// update comment route....................

router.put("/camgrounds/:id/comments/:comment_id",middleware.isAuthorizedForComment,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,updatedComment){
        if(err){
            res.render("back");
        }else{
          req.flash("success","comment updated Successfully")
        res.redirect("/camgrounds/"+req.params.id);
        }
    })
})

// delete route for comments.........

router.delete("/camgrounds/:id/comments/:comment_id",middleware.isAuthorizedForComment, function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("/back")
        }else{
          req.flash("error","comment Deleted !!!")
            res.redirect("/camgrounds/"+req.params.id)
        }

    })

})


// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
// }



// function isAuthorized(req,res,next){
//     if(req.isAuthenticated()){
//         // does have permissions
//         comment.findById(req.params.comment_id,function(err,foundComment){

//             if(err){
//                 res.redirect("back")
//             }else{

//                 // render this page only user have authorization
//                 if(foundComment.author.id.equals(req.user._id)){
//                     next()
//                 }else{
//                 res.redirect("back")
//                 }
//             }
//     })
//     }else{
//         res.redirect("back")
//     }
// }

module.exports = router
