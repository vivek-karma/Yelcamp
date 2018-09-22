var mongoose = require("mongoose"),
    campgrounds = require("./models/campground"),
    comments = require("./models/comment")
    
    
var data = [
    {
        name:"goa",
        img:"https://www.hlimg.com/images/places2see/738X538/Goa-cover-image_1472037578p.jpg",
        description:"i wanna go to goa once in m life"
    },
    {
        name:"haridwar",
        img:"https://timesofindia.indiatimes.com/thumb/49335807.cms?width=423&height=281",
        description:"i lived 4 years of my life in haridwar. haridwarr is best place to visit for ganga river....."
    },
    {
        name:"srinagar",
        img:"https://timesofindia.indiatimes.com/thumb/55091830.cms?width=423&height=281",
        description:"i am thinking about going srinager jheel once"
    },
    {
        name:"mysore",
        img:"https://media-cdn.tripadvisor.com/media/photo-s/0f/5d/7a/19/private-excursion-to.jpg",
        description:"wow i am going there for my training purpose"
    },
    {
        name:"nainital",
        img:"https://dynamic.tourtravelworld.com/blog_images/best-time-to-visit-nainital-20161006030855.jpg",
        description:"i planed once to go there but can't go there ufff!!"
    },
    {
        name:"goa",
        img:"https://www.hlimg.com/images/places2see/738X538/Goa-cover-image_1472037578p.jpg",
        description:"again goa wow!!!!!!!!!"
    },
    {
        name:"haridwar",
        img:"https://timesofindia.indiatimes.com/thumb/49335807.cms?width=423&height=281",
        description:"i wish to go again with my family......."
    },
    
]



function seedDb(){
    campgrounds.deleteMany({},function(err){
        if(err){
            console.log(err)
        }
        console.log("all campgrounds are removed")
    });
    
   // adding new campgrounds
    data.forEach(function(camp){
        campgrounds.create(camp, function(err, campground){
        if(err){
            console.lg(err);
        }else{
            console.log("new campground is added")
           
            comments.deleteMany({},function(err){
                
                if(err){
                    console.log(err);
                }else{
                    
                    comments.create({
                text:"hi nice place",
                author:"vivek"
            },function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    console.log("comment is added......")
                    campground.comments.push(comment)
                    campground.save()
                    
                }
            })    
                    
                    
                }
                
            })
              
            
            
           
        }
    })
        
    })
    
 }



module.exports = seedDb


