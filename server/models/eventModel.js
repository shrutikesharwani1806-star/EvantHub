import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true, "Please Fill Your Name Here!"]
    },
    title : {
        type : String,
        required : [true, "Please Enter Event Title"]
    },
    description : {
        type : String,
        required : [true, "Please Enter Event Description"]
    },
    category : {
        type : String,
        required : [true, "Please Enter Event Category"]
    },
    eventImage : {
        type : String,
        required : [true, "Please Enter Event Image URL.."]
    },
    eventDate : {
        type : String,
        required : [true, "Please Enter Event Date"]
    },
    eventLocation : {
        type : String,
        required : [true, "Please Enter Event Location"]
    },
    eventArtistName : {
        type : String,
        required : [true, "Please Enter Event Artist Name"]
    },
    totalSeats : {
        type : Number,
        required : [true, "Please Enter Total Seats Available"]
    },
    duration : {
        type : String,
        required : [true, "Please Enter Event Duration"]
    },
    ticketPrice : {
        type : Number,
        required : [true, "Please Enter Event Ticket Price"]
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
    status : {
        type : String,
        enum : ["pending", "approved", "upcoming", "onGoing", "expired", "cancelled", "rejected"],
        default : "pending"
    },
    rejectionReason : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})


const Event = mongoose.model("Event", eventSchema)

export default Event