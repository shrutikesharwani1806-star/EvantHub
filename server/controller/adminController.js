import User from "../models/userModel.js"
import Event from "../models/eventModel.js"
import Coupon from "../models/couponModel.js"
import Order from "../models/orderModel.js"
import Comment from "../models/commentModel.js"
import fs from "node:fs"
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js"

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) {
        res.status(404)
        throw new Error("users not found!")
    }
    res.status(200).json(users)

}

const updateUser = async (req, res) => {

    let {isActive , credits} = req.body

    const userId = req.params.uid

    let user = await User.findById(userId)

    if(!user){
        res.status(404)
        throw new Error("User not found!")
    }

    let updateData = {}

    if (isActive !== undefined) {
        updateData.isActive = isActive
    }

    if (credits !== undefined) {
        updateData.credits = user.credits + parseInt(credits)
    }

    if (Object.keys(updateData).length === 0) {
        res.status(400)
        throw new Error("No valid fields to update!")
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { returnDocument: "after" })

    if(!updatedUser){
        res.status(409)
        throw new Error("User Not Updated")
    }

    res.status(200).json(updatedUser)
}

const getAllEvents = async (req, res) => {
    const events = await Event.find().populate('user')
    if (!events) {
        res.status(404)
        throw new Error("Events not found!")
    }
    res.status(200).json(events)
}

const updateEvent = async (req, res) => {

    const eventId = req.params.eid

    let updateData = { ...req.body }

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path)
        fs.unlinkSync(req.file.path)
        updateData.eventImage = uploadResult.secure_url
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { returnDocument: "after" }).populate('user')

    if (!updatedEvent) {
        res.status(409)
        throw new Error("Event Not Updated!")
    }

    res.status(200).json(updatedEvent)

}

const getAllRatings = async (req, res) => {
    const comments = await Comment.find()
      .populate({ path: "event", select: "title" })
      .populate({ path: "user", select: "name" });

    const groupedRatings = comments.reduce((acc, comment) => {
      if (!comment.event) return acc;

      const eventId = comment.event._id.toString();
      if (!acc[eventId]) {
        acc[eventId] = {
          event: comment.event,
          totalReviews: 0,
          averageRating: 0,
          reviews: [],
        };
      }

      acc[eventId].totalReviews += 1;
      acc[eventId].averageRating += comment.rating;
      acc[eventId].reviews.push({
        id: comment._id,
        text: comment.text,
        rating: comment.rating,
        createdAt: comment.createdAt,
        user: {
          name: comment.user?.name || "Unknown",
        },
        userName: comment.user?.name || "Unknown",
      });

      return acc;
    }, {});

    const eventRatings = Object.values(groupedRatings).map((group) => ({
      ...group,
      averageRating: group.totalReviews
        ? parseFloat((group.averageRating / group.totalReviews).toFixed(1))
        : 0,
      reviews: group.reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    }));

    res.status(200).json(eventRatings);
}

const getAllComments = async (req, res) => {
    const comments = await Comment.find().populate('user').populate('event')

    if(!comments || comments.length === 0){
        res.status(404)
        throw new Error("No comments found...")
    }

    res.status(200).json(comments)
}

const getAllOrders = async (req, res) => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const orders = await Order.find({
        $or: [
            { status: { $ne: 'cancelled' } },
            { status: 'cancelled', updatedAt: { $gte: threeDaysAgo } }
        ]
    }).populate('user').populate('event')

    if (!orders){
        res.status(404)
        throw new Error("Order Not Found!")
    }

    res.status(200).json(orders)
}

const createCoupon = async (req, res) => {
    const { couponCode, couponDiscount } = req.body

    if(!couponCode || !couponDiscount){
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    //check if coupn is already exist
    const couponExist = await Coupon.findOne({couponCode})
    if(couponExist){
        res.status(409)
        throw new Error("Coupon Already Exist!")
    }

    const newCoupon = await Coupon.create({ couponCode, couponDiscount })

    if(!newCoupon){
        res.status(409)
        throw new Error("Coupon Not Created!")
    }

    res.status(201).json(newCoupon)

}  


const getAllCoupons = async (req, res) => {
    const coupons = await Coupon.find()

    if(!coupons){
        res.status(404)
        throw new Error("Coupons Not Found!")
    }

    res.status(200).json(coupons)
}

const updateCoupon = async (req, res) => {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.cid, req.body, { returnDocument: "after" })

    if(!updateCoupon){
        res.send(409)
        throw new Error("Coupon Not Updated!")
    }

    res.status(200).json(updatedCoupon)
}

const adminController = { getAllUsers, updateUser, getAllEvents, getAllComments, getAllRatings, getAllOrders, getAllCoupons, updateEvent, createCoupon, updateCoupon }
export default adminController