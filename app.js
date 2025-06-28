const express= require("express");
const app=express();
const path=require("path");
const cookieParser=require("cookie-parser");
const user


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3000);