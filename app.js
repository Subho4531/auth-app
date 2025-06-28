const express= require("express");
const app=express();
const path=require("path");
const cookieParser=require("cookie-parser");
const { request } = require("http");
const userModel=require("./models/model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render("index");
});

app.post('/create', (req, res) => {
  const {username,password,email,age} = req.body;
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
      console.log(hash)
      const user = await userModel.create({username,password:hash,email,age});
      const token = jwt.sign({email},"shhhhhhhhh");
      res.cookie("token",token);
      res.send(user);
    })
  }
  )
});

app.get("/logout",(req,res)=>{
  res.cookie("token","");
  res.redirect("/");
})

app.get('/login', (req, res) => {
  res.render("login");
});

app.post("/login",async(req,res)=>{
  let user=await userModel.findOne({email:req.body.email});
  if(!user) res.send("something is wrong").status(404);
  bcrypt.compare(req.body.password,user.password,async(err,reasult)=>{
    if(reasult){
      const token = jwt.sign(user.email,"shhhhhhhhh");
      res.cookie("token",token);
      res.send("Everything is ok");

    } 
      
    else res.send("something is wrong").status(404);
  });

})


app.listen(3000);