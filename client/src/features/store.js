import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import event from "./event/eventSlice"
import order from "./order/orderSlice"
import admin from "./admin/adminSlice"
import toastMiddleware from "../middleware/toastMiddleware"

const store = configureStore({
    reducer : { auth , event, order , admin },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware)
})

export default store