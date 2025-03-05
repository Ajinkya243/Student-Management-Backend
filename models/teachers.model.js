
const mongoose=require('mongoose');

const teacherschema=new mongoose.Schema({
    name:String,
    gender:{
        type:String,
        enum:['Male','Female']
    },
    subject:String,
    rating:{
        type:Number,
        min:1,
        max:5
    }
})

const Teacher=mongoose.model('Teacher',teacherschema);

module.exports={Teacher}