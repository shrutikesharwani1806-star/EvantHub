import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import Comment from "../models/commentModel.js"

const registerUser = async (req, res) => {

    const { name, email, phone, password } = req.body

    //check if all details are provided
    if (!name || !email || !phone || !password) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    //check if user already exists
    let emailExist = await User.findOne({ email: email.toLowerCase() })
    let phoneExist = await User.findOne({ phone: phone })


    //Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (emailExist || phoneExist) {
        res.status(400)
        throw new Error("User Already Exists!")
    }

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword
    })

    if (!user) {
        res.status(400)
        throw new Error("user not created!")
    }

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        credits: user.credits,
        token: generateToken(user._id)
    })
}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    //check if all details are provided
    if (!email || !password) {
        res.status(409)
        throw new Error("Please Fill All Details!")
    }

    //check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() })

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            credits: user.credits,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials!")
    }
}

const getUserProfile = async (req, res) => {
    
    const user = await User.findById(req.params.uid)
    const events = await Order.find({user : user._id})
    const comments = await Comment.find({user : user._id})

    if(!user || !events || !comments){
        res.status(404)
        throw new Error("No Data Found!")
    }

    res.status(200).json({
        user,
        events,
        comments
    })
}

const privateController = (req, res) => {
    res.send("Private Controller " + req.user.name)
}


//Generate Token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '10d'})
}

const authController = { registerUser, loginUser, privateController, getUserProfile }
export default authController