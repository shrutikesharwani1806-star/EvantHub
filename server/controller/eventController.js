import fs from "node:fs"
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js"
import Event from "../models/eventModel.js"


const createEvent = async (req, res) => {


    const { title, description, category, eventDate, eventLocation, eventArtistName, totalSeats, duration, ticketPrice, status } = req.body


    if (!title || !description || !category || !eventDate || !eventLocation || !eventArtistName || !totalSeats || !duration || !ticketPrice) {
        res.status(409)
        throw new Error("Please Enter All Details!")
    }

    //upload to cloudinary
    const uploadResult = await uploadToCloudinary(req.file.path)

    //remove image from server
    fs.unlinkSync(req.file.path)

    //create event
    const newEvent = await Event.create({ user: req.user._id, title, description, category, eventDate, eventLocation, eventArtistName, totalSeats, duration, ticketPrice, eventImage: uploadResult.secure_url, status: status || "pending" })

    if (!newEvent) {
        res.status(400)
        throw new Error("Event Not Created!")
    }


    res.status(201).json(newEvent)



}

//Get Events
const getEvents = async (req, res) => {

    const events = await Event.find().populate('user')

    if (!events) {
        res.status(404)
        throw new Error("Events Not Found!")
    }

    const activeEvents = events.filter(event => event.isActive && (event.status === "approved" || event.status === "upcoming" || event.status === "onGoing"))

    res.status(200).json(activeEvents)

    if (activeEvents.length === 0) {
        return res.status(200).json({ message: "No active events", data: [] })
    }

}

//Get Event
const getEvent = async (req, res) => {

    const event = await Event.findById(req.params.eid)

    if (!event) {
        res.status(404)
        throw new Error("Event Not Found!")
    }

    if (!event.isActive) {
        res.status(404)
        throw new Error("Event Is Not Active Yet!!")
    }

    res.status(200).json(event)

}



const eventController = { createEvent, getEvents, getEvent }

export default eventController