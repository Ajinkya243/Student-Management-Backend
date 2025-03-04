const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name:String,
    age:Number,
    gender:{
        type:String,
        enum:['Male','Female']
    },
    marks:Number,
    attendance:Number,
    grade:String
})

const Student=mongoose.model('Student',studentSchema);

module.exports={Student};