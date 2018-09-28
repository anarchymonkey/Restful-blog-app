const express = require("express");
const app = express();
app.set("view engine","ejs");
const bodyParser = require("body-parser");
const request = require("request");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

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

/* ******************************************************************** */
/*                       BLOGS UPDATE                                   */
/* ******************************************************************** */
app.get("/blogs/update/:id",function(req,res){
  console.log("ACCESSED THE BLOGS/UPDATE PAGE WHERE THE VIEWERS WILL UPDATE THE BLOGS");
  res.render("updateBlog");
});


app.listen(3002,function(){
  console.log("LISTENING ON PORT 3002");
});
