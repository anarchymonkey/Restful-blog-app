const express = require("express");
const app = express();
app.set("view engine","ejs");
const bodyParser = require("body-parser");
const request = require("request");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

/* Database config */
 const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser : true });
let blogSchema = new mongoose.Schema({
  title : String,
  image : String,
  body : String,
  create :{
    type: Date ,
    default : Date.now
  }

});
/* DATABASE CONFIG */
let Blog = mongoose.model("Blog",blogSchema);



/* ******************************************************************** */
/*                      HOME PAGE                                       */
/* ******************************************************************** */
/* FOR FIRST TIME ENTRY

Blog.create({
  title : "Test Blog",
  image : "https://images.pexels.com/photos/414660/pexels-photo-414660.jpeg?auto=compress&cs=tinysrgb&h=350",
  body : " Hey , this is my first blog. My name is Aniket"
});
*/

app.get("/",function(req,res){
  console.log("ACCESSED THE INDEX PAGE");
  res.redirect("blogs");
});
/* ******************************************************************** */
/*                       BLOGS SITE                                     */
/* ******************************************************************** */
app.get("/blogs",function(req,res){
  console.log("ACCESSED THE BLOGS PAGE WHERE VIEWERS WILL VIEW THE OBJECTS");

Blog.find({},function(err,blogs)
{
  if(err)
  {
    console.log("ERROR IN RETRIVING");
  }
  else
  {
    res.render("blogs",{blogs : blogs });
  }
});
});

/* ******************************************************************** */
/*                       BLOGS CREATE                                   */
/* ******************************************************************** */

app.get("/blogs/create",function(req,res){
  console.log("ACCESSED THE BLOGS/CREATE PAGE WHERE THE VIEWERS WILL TYPE THE BLOG");
  res.render("createBlog");
});

app.post("/blogs",function(req,res){
  Blog.create(req.body.blog,function(err,body){

    if(err)
    {
      res.render("createBlog");
    }
    else
    {
      res.redirect("/blogs");
    }
  });
});

/* ******************************************************************** */
/*                       BLOGS SHOW                                   */
/* ******************************************************************** */

app.get("/blogs/:id",function(req,res){
   Blog.findById(req.params.id,function(err,body){
     if(err)
     {
       res.redirect("/blogs");
     }
     else
     {
       res.render("show", {body : body});
     }
   });
});

/* ******************************************************************** */
/*                       BLOGS UPDATE                                   */
/* ******************************************************************** */
app.get("/blogs/update/:id",function(req,res){
  console.log("ACCESSED THE BLOGS/UPDATE PAGE WHERE THE VIEWERS WILL UPDATE THE BLOGS");

  Blog.findById(req.params.id , function(err,updateThis){
      if(err)
      {
        res.redirect("show");
      }
      else
      {
        res.render("updateBlog",{updated:updateThis});
      }
  });
});

app.put("/blogs/:id",function(req,res){
  Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated){

    if(err){
      res.redirect("/blogs");
    }
    else {
      res.redirect("/blogs/"+ req.params.id);
    }
  });
  console.log("accessed the update page");
});


app.listen(3002,function(){
  console.log("LISTENING ON PORT 3002");
});
