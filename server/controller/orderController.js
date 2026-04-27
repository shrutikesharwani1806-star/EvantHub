import Coupon from "../models/couponModel.js"
import Event from "../models/eventModel.js"
import Order from "../models/orderModel.js"
import User from "../models/userModel.js"

const getTickets = async (req, res) => {

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const myTickets = await Order.find({ 
        user: req.user._id,
        $or: [
            { status: { $ne: 'cancelled' } },
            { status: 'cancelled', updatedAt: { $gte: threeDaysAgo } }
        ]
    }).populate('user').populate('event')

    if (!myTickets) {
        res.status(404)
        throw new Error("Tickets Not Found!")
    }

    res.status(200).json(myTickets)
}

const getTicket = async (req, res) => {
    const myTicket = await Order.findById(req.params.tid).populate('user').populate('event')

    if (!myTicket) {
        res.status(404)
        throw new Error("Ticket Not Found!")
    }

    res.status(200).json(myTicket)
}

const bookTicket = async (req, res) => {

    let userId = req.user._id

    const { numberOfSeats, couponCode } = req.body

    if (!numberOfSeats) {
        res.status(409)
        throw new Error("Kindly Select Atlest One Seat!")
    }
    //check if event exists

    const eventId = req.params.eid

    const event = await Event.findById(eventId)

    if (!event) {
        res.status(404)
        throw new Error("Event Not Found!")
    }

    //check if seats available
    if (event.totalSeats < numberOfSeats || numberOfSeats > 5) {
        res.status(409)
        throw new Error("Seats Not Available!")
    }

    // //check if user have already booked 5 seats 
    const allPreviousOrders = await Order.find({ event: event._id })

    // //filter my orders by event
    const myOrders = allPreviousOrders.filter((order) => order.user.toString() === userId.toString())

    // //calculate total seats booked
    let myExistingBookedSeats = myOrders
        .filter((order) => order.status !== "cancelled")
        .reduce((acc, order) => acc + order.seats, 0)


    if (myExistingBookedSeats + parseInt(numberOfSeats) > 5) {
        res.status(409)
        throw new Error(`Only 5 Tickets Allowed Per User! ${5 - myExistingBookedSeats - numberOfSeats} seats available`)
    }


    //check if request is coming with coupon

    let couponExists

    if (couponCode) {
        //check if coupon is valid
        couponExists = await Coupon.findOne({ couponCode })

        if (!couponExists) {
            res.status(404)
            throw new Error("Coupon Not Exists!")
        }
    }

    const totalBillAmount = couponCode ? (event.ticketPrice - (event.ticketPrice * couponExists.couponDiscount / 100)) * numberOfSeats : event.ticketPrice * numberOfSeats

    //Find User
    let user = await User.findById(userId)

    if (totalBillAmount > user.credits) {
        res.status(409)
        throw new Error("Not Enough Credits!")
    }

    let order = await Order.create({
        user: req.user._id,
        event: eventId,
        seats: numberOfSeats,
        status: "confirmed",
        isDiscounted: couponCode ? true : false,
        billedAmount: totalBillAmount
    })


    //decrease Available Seats
    let updatedSeats = event.totalSeats - numberOfSeats
    await Event.findByIdAndUpdate(event._id, { totalSeats: updatedSeats }, { returnDocument: "after" })


    //Decrease Credits
    await User.findByIdAndUpdate(userId, { credits: user.credits - totalBillAmount }, { returnDocument: true })

    if (!order) {
        res.status(409)
        throw new Error("Order Not Accepted!")
    }

    res.status(201).json(order)


}

const cancelTicket = async (req, res) => {
    let userId = req.user._id;

    const ticketId = req.params.tid;

    let ticket = await Order.findById(ticketId);

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket Not Found!");
    }

    if (ticket.status === "cancelled") {
        res.status(400);
        throw new Error("Ticket Already Cancelled!");
    }

    if (ticket.status === "expired") {
        res.status(409);
        throw new Error("Ticket Already Expired!");
    }

    let user = await User.findById(userId);

    // ✅ FIXED
    const event = await Event.findById(ticket.event);

    // Increase seats
    let updatedSeats = event.totalSeats + ticket.seats;
    await Event.findByIdAndUpdate(event._id, { totalSeats: updatedSeats });

    // Refund credits
    await User.findByIdAndUpdate(userId, {
        credits: user.credits + ticket.billedAmount,
    });

    // ✅ FIXED
    const updatedTicket = await Order.findByIdAndUpdate(
        ticket._id,
        { status: "cancelled" },
        { new: true }
    );

    res.status(200).json(updatedTicket);
};

const applyCoupon = async (req, res) => {
    const { couponCode } = req.body

    let couponExists = await Coupon.findOne({ couponCode })

    if (!couponExists) {
        res.status(404)
        throw new Error("Invalid Coupon Code!")
    }

    res.status(200).json(couponExists)
}

const orderController = { bookTicket, cancelTicket, getTicket, getTickets, applyCoupon }

export default orderController
