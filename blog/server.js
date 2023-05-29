const mongoose = require("mongoose")
const express = require("express")

const app= express()
app.use(express.json())
const PORT = 2006


const blogschema = new mongoose.Schema({
    name : String,
    title: String,
    summary: String
    
})

const user = mongoose.model("blog", blogschema)

app.post("/createBlog", async (req, res) => {
     const newBlog = await user.create(req.body)
     res.status(200).json({
        new: newBlog
     })
})

app.get ("/getAll", async (req, res) => {
    const allusers = await user.find()
    res.status(200).json( {
        message: "The available users in my database are: " + allusers.length,
        data: allusers
    })
})

app.delete ("/delete/:id", async (req, res) => {
    const id = req.params.id
    const deleteblog = await user.findByIdAndDelete((id)) 

    res.status(200).json( {
        message : `This info: ${id} has been deleted`,
        data : deleteblog
    })
})

app.put( "/update/:id", async(req, res) => {
    const id = req.params.id
    const updateblog = req.body;
    const index = await user.findByIdAndUpdate(id, updateblog, {new: true});

    res.status(200).json( {
        message : `This info: ${id} has been updated`,
        data : index
    })
    
});




const url = "mongodb://localhost/schoolDB"
const uri = ""

mongoose.connect(url)
.then(()=>{
    console.log("connection sucessful");
})
.catch(()=> {
    console.log("connection failed");
})


// mongoose.connect("mongodb+srv://alexandravera789:lnQTjxb6By1aE9sp@cluster0.rf5vgpv.mongodb.net/")
// .then( () => {
//     console.log('connected to database sucessfully');
// })

app.listen( PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})