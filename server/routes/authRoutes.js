import express from "express"
import authController from "../controller/authController.js"
import Protect from "../middleware/authMiddleware.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/:uid" , protect.forUser , authController.getUserProfile )
router.post("/private", Protect.forUser, authController.privateController)

export default router