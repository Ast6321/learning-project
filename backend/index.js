const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
app.use(express.json());
app.use(cors());
app.use(express.static("frontend"));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));



const storage = multer.diskStorage({
 destination:function(req,file,cb){
  cb(null,"uploads");
 },
 filename:function(req,file,cb){
  cb(null,Date.now()+"-"+file.originalname);
 }
});

const upload = multer({storage:storage});



app.get("/users", (req, res) => {
    const userdata = fs.readFileSync("data.json");
    const users = JSON.parse(userdata);
    res.json(users);
});

app.get("/users/:id",(req,res)=>{
    const userdata = fs.readFileSync("data.json");
    const users = JSON.parse(userdata);

    const id  = req.params.id ;
    const user1 = users.find(element => element.id == id);
     if(!user1){
      res.status(404).json("User not found");
   } 
   else{
      res.json(user1);
   }
        
})


app.post("/user", upload.single("image"),(req,res)=>{
    const userdata = fs.readFileSync("data.json");
    const users = JSON.parse(userdata);
   const maxid = users.reduce((max,element)=>{
    return element.id > max?element.id:max;
   },0);
    const data = req.body;
    const img = req.file ? req.file.filename : null;
    const freshuser = {
        "id":maxid+1,
        ...data,img
    };
    users.push(freshuser);
    const newuser = JSON.stringify(users);
    fs.writeFileSync("data.json" , newuser);
    res.json("user added successfuly");  

})

app.listen(8000, () => {
    console.log("Server running on port 8000");
});