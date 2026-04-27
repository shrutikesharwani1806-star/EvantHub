import axios from "../../utils/axiosInstance"

const API_URL = "/api/admin"

const fetchAllUsers = async (token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/users", options)
    return response.data
}

const fetchAllEvents = async (token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/events", options)
    return response.data
}

const fetchAllOrders = async (token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/orders", options)
    return response.data
}

const fetchAllRatings = async (token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/ratings", options)
    return response.data
}

const fetchAllCoupons = async (token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/coupons", options)
    return response.data
}

const createCoupon = async (formData, token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "/coupons", formData, options)
    return response.data
}

const createEvent = async (formData, token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post("/api/events", formData, options)
    return response.data
}

const updateEvent = async (formData, token) => {

    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put("/api/admin/events/" + formData.get('_id'), formData, options)
    return response.data

}

const updateUser = async (update, token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put("/api/admin/users/" + update.uid, update, options)
    return response.data
}

const updateCoupon = async (update, token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put("/api/admin/coupons/" + update.cid, update, options)
    return response.data
}

export const adminService = {
    fetchAllUsers,
    fetchAllRatings,
    fetchAllOrders,
    fetchAllEvents,
    fetchAllCoupons,
    createCoupon,
    createEvent,
    updateEvent,
    updateUser,
    updateCoupon
}

export default adminService