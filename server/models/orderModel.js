import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'confirmed', 'cancelled', 'expired'],
        required : true,
        default : 'pending'
    },
    seats : {
        type : Number,
        required : true
    },
    isDiscounted : {
        type : Boolean,
        default : false
    },
    billedAmount : {
        type : Number,
        required : true,
        default : false
    },
},{
    timestamps : true
})

const Order = mongoose.model('order', orderSchema)

export default Order