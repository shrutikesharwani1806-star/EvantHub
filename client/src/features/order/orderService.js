
import axios from "../../utils/axiosInstance"

const API_URL = "/api/order"

const fetchTickets = async (token) => {
    if (!token) {
        throw new Error("Authentication token required")
    }

    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, options)
    return response.data
}

const fetchTicket = async (tid, token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/${tid}`, options)
    return response.data
}

const bookTicket = async (formData, token) => {

    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post("/api/order/" + formData.eventId , formData, options )
    return response.data
}

const cancelTicket = async(tid, token) => {

    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put("/api/order/" + tid , {} , options )
    return response.data
}

const checkCoupon = async (couponCode) => {
const response = await axios.post("/api/coupon/apply" , couponCode)
    return response.data

}

const orderService = { fetchTickets, fetchTicket , bookTicket , cancelTicket, checkCoupon}

export default orderService