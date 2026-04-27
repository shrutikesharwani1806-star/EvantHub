import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "please enter your Name!"]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "please enter your Email!"]
    },
    phone : {
        type : String,
        unique : true,
        required : [true, "please enter your Phone Number!"]
    },
    password : {
        type : String,
        required : [true, "please enter your Password!"]
    },
    isActive : {
        type : Boolean,
        default : true,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false,
        required : true
    },
    credits : {
        type : Number,
        default : 0,
        required : true
    }
},{
    timestamps : true
})

const User = mongoose.model('User', userSchema)

export default User