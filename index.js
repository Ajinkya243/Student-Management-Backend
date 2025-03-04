const {connectDB} =require('./db/db.connect');
const {Student} = require('./models/students.model')
const cors = require('cors')
const express=require('express');
const app=express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT

connectDB().then(()=>console.log('Database connected.')).then(()=>{
    app.listen(port,()=>{
        console.log('Express running port:',port)
    })
})

app.get("/",(req,resp)=>{
    resp.send('Student Management Backend')
})

app.get("/students",async(req,resp)=>{
    try{
        const students=await Student.find();
        resp.json(students);
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching"})
    }
})

app.post("/students",async(req,resp)=>{
    try{
        const student=await Student(req.body);
        await student.save();
        resp.status(201).json({student})
    }
    catch(error){
        resp.status(500).json({error:'Error while posting'})
    }
})

app.get("/students/:id",async(req,resp)=>{
    try{
        const student=await Student.findById(req.params.id);
        resp.json(student);
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})

app.post("/students/:id",async(req,resp)=>{
    try{
        const studentId=req.params.id;
        const student = await Student.findByIdAndUpdate(studentId,req.body,{new:true});
        if(!student){
           return resp.status(404).json({error:'Student not found'})
        }
        resp.json(student);
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})

app.delete("/students/:id",async(req,resp)=>{
    try{
        const student=await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return resp.status(404).json({error:'Student not found'})
        }
        resp.json(student);
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})