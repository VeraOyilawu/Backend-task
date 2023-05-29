const mongoose = require("mongoose")
const express = require("express")

const app= express()
app.use(express.json())
const PORT = 2006


const todolistschema = new mongoose.Schema({
    name: String,
    day: String,
    taskType:String,
    doneOrunDone :String
    
})

const user = mongoose.model("todolist", todolistschema)

app.post("/createTodoList", async (req, res) => {
     const list = await user.create(req.body)
     res.status(200).json({
        list: list
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
    const deleteuser = await user.findByIdAndDelete((id)) 

    res.status(200).json( {
        message : `This info: ${id} has been deleted`,
        data : deleteuser
    })
})


app.put( "/update/:id", async(req, res) => {
    const id = req.params.id
    const updateduser = req.body;
    const index = await user.findByIdAndUpdate(id, updateduser, {new: true});

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