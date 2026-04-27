import axios from "../../utils/axiosInstance"

const API_URL = "/api/auth"

const register = async (formData) => {
    const response = await axios.post(API_URL + "/register" , formData)
    localStorage.setItem('user' , JSON.stringify(response.data))
    return response.data
}

const login = async (formData) => {
    const response = await axios.post(API_URL + "/login" , formData)
    localStorage.setItem('user' , JSON.stringify(response.data))
    return response.data
}

const fetchProfile = async(uid, token) => {

    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get("/api/auth/" + uid , options)
    return response.data

}

const authService = { register, login, fetchProfile }

export default authService