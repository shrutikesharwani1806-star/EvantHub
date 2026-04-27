import express from "express"
import path from 'node:path'
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import colors from "colors"

//local imports
import connectDB from "./config/dbConfig.js"
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import giveAnswer from "./controller/chatController.js"
import protect from "./middleware/authMiddleware.js"



dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//DB connection 
connectDB()


const PORT = process.env.PORT || 5000

const app = express()


//Body-parser
app.use(express.json())
app.use(express.urlencoded())

// CORS — allow frontend dev server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
})



//auth routes
app.use("/api/auth", authRoutes)


//admin routes
app.use("/api/admin", adminRoutes)

//Event Routes
app.use("/api/events", eventRoutes)


//Ticket Booking Routes
app.use("/api/order", orderRoutes)

//coupon Routes
app.use("/api/coupon", couponRoutes)

//Comment Routes
app.use("/api/comment", commentRoutes)

//chat Routes
app.post("/api/chat",protect.forUser, giveAnswer)


const buildPath = path.resolve(__dirname, '../client/dist')
//5. static file serving & SPA Routing
if (process.env.NODE_ENV == 'production') {
    //serve static files from the build directory
    app.use(express.static(buildPath));

    //express v5 requires a named parameter for wildcards (/* splat)
    app.get('/*splat', (req,res) => {
        res.sendFile(path.join(buildPath, 'index.html'), (err) => {
            if (err) {
                //if index.html is missing, this provide a clearer error
                res.status(500).send("Build file index.html not found. ensure you ran 'npm run build")
            }
        })
    })
}else {
    app.get("/", (req,res) => {
        res.send("API is running... (Development Mode)");
    })
}


//error Handler 
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.white)
})





