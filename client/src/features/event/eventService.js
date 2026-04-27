import axios from "../../utils/axiosInstance"


const API_URL = "/api/events"

const fetchEvents = async() => {
    const response = await axios.get(API_URL)
    return response.data

}

const fetchEvent = async (eid) => {
    const response = await axios.get(API_URL + `/${eid}`)
    return response.data
}

const fetchEventComments = async (eid) => {
    const response = await axios.get(`/api/comment/${eid}`)
    return response.data
}

const addComment = async (data) => {
    const { eventId, ...commentData } = data;
    const response = await axios.post(`/api/comment/${eventId}`, commentData)
    return response.data
}

const eventService = {fetchEvents , fetchEvent , fetchEventComments, addComment}

export default eventService

