import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import eventService from "./eventService"

const initialState = {

    events: [],
    event: {},
    eventComments: [],
    eventLoading: false,
    eventSuccess: false,
    eventError: false,
    eventErrorMessage: ""
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getEvents.pending, (state, action) => {
                state.eventLoading = true,
                    state.eventSuccess = false,
                    state.eventError = false
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = true,
                    state.events = action.payload,
                    state.eventError = false
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = false,
                    state.eventError = true,
                    state.eventErrorMessage = action.payload
            })
             .addCase(getEvent.pending, (state, action) => {
                state.eventLoading = true,
                    state.eventSuccess = false,
                    state.eventError = false
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = true,
                    state.event = action.payload,
                    state.eventError = false
            })
            .addCase(getEvent.rejected, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = false,
                    state.eventError = true,
                    state.eventErrorMessage = action.payload
            })
             .addCase(getEventComments.pending, (state, action) => {
                state.eventLoading = true,
                    state.eventSuccess = false,
                    state.eventError = false
            })
            .addCase(getEventComments.fulfilled, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = true,
                    state.eventComments = action.payload,
                    state.eventError = false
            })
            .addCase(getEventComments.rejected, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = false,
                    state.eventError = true,
                    state.eventErrorMessage = action.payload
            })
            .addCase(addComment.pending, (state, action) => {
                state.eventLoading = true,
                    state.eventSuccess = false,
                    state.eventError = false
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = true,
                    state.eventComments = [action.payload, ...state.eventComments],
                    state.eventError = false
            })
            .addCase(addComment.rejected, (state, action) => {
                state.eventLoading = false,
                    state.eventSuccess = false,
                    state.eventError = true,
                    state.eventErrorMessage = action.payload
            })

    }

})

export const { } = eventSlice.actions

export default eventSlice.reducer

//get events
export const getEvents = createAsyncThunk("EVENTS/FETCH", async (_, thunkAPI) => {
    try {
        return await eventService.fetchEvents()
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }

})


//get event
export const getEvent = createAsyncThunk("EVENT/FETCH", async (eid, thunkAPI) => {
    try {
        return await eventService.fetchEvent(eid)
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }

})


//get event comments
export const getEventComments = createAsyncThunk("EVENT/FETCH/COMMENTS", async (eid, thunkAPI) => {
    try {
        return await eventService.fetchEventComments(eid)
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }

})

//add comment
export const addComment = createAsyncThunk("EVENT/ADD/COMMENT", async (data, thunkAPI) => {
    try {
        return await eventService.addComment(data)
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }

})


