const express=require("express");
const app=express();
const port=8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Rahul Kumar",
        content:"I love Reading"
    },
    {
        id:uuidv4(),
        username:"adityaDhumal",
        content:"I love coding "
    },
    {
        id:uuidv4(),
        username:"Rohit Sharma",
        content:"I love cricekt"
    },
]

app.get("/posts",(req,res)=>{
   res.render(`index.ejs`,{ posts });
})

app.get("/posts/new",(req,res)=>{
    res.render(`form.ejs`,{ posts });
 })

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post=posts.find((p) => id == p.id);
   res.render("show.ejs",{post});
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
