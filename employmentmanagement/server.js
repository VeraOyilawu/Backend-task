const mongoose = require("mongoose")
const express = require("express")

const app= express()
app.use(express.json())
const PORT = 2006


const employmentschema = new mongoose.Schema({
   managerName: String,
   managersecetary: String,
   employee: String
})

const user = mongoose.model("employmentManagement", employmentschema)

app.post("/createemployee", async (req, res) => {
     const employer = await user.create(req.body)
     res.status(200).json({
        list: employer
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
    const deleteEmployer = await user.findByIdAndDelete((id)) 

    res.status(200).json( {
        message : `This info: ${id} has been deleted`,
        data : deleteEmployer
    })
})

app.put( "/update/:id", async(req, res) => {
    const id = req.params.id
    const updateEmployer = req.body;
    const index = await user.findByIdAndUpdate(id, updateEmployer, {new: true});

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