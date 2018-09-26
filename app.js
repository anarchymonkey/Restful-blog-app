const express = require("express");
const app = express();
app.set("view engine","ejs");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
app.use(express.static("public"));
/* ******************************************************************** */
/*                      HOME PAGE                                       */
/* ******************************************************************** */
app.get("/",function(req,res){
  console.log("ACCESSED THE INDEX PAGE");
  res.render("index");
});
/* ******************************************************************** */
/*                       BLOGS SITE                                     */
/* ******************************************************************** */

app.get("/blogs",function(req,res){
  console.log("ACCESSED THE BLOGS PAGE WHERE VIEWERS WILL VIEW THE OBJECTS");
  res.render("blogs");
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
