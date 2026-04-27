import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";


const initialState = {

    orders: [],
    order: {},
    coupons: {},
    orderLoading: false,
    orderSuccess: false,
    orderError: false,
    orderErrorMessage: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state, action) => {
                state.orderLoading = true,
                    state.orderSuccess = false,
                    state.orderError = false
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = true,
                    state.orders = action.payload,
                    state.orderError = false
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = false,
                    state.orderError = true,
                    state.orderErrorMessage = action.payload
            })
            .addCase(applyCoupon.pending, (state, action) => {
                state.orderLoading = true,
                    state.orderSuccess = false,
                    state.orderError = false
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = true,
                    state.coupons = action.payload,
                    state.orderError = false
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = false,
                    state.orderError = true,
                    state.orderErrorMessage = action.payload
            })
            .addCase(ticketBook.pending, (state, action) => {
                state.orderLoading = true,
                    state.orderSuccess = false,
                    state.orderError = false
            })
            .addCase(ticketBook.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = true,
                    state.order = action.payload,
                    state.orderError = false
            })
            .addCase(ticketBook.rejected, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = false,
                    state.orderError = true,
                    state.orderErrorMessage = action.payload
            })
            .addCase(ticketCancel.pending, (state, action) => {
                state.orderLoading = true,
                    state.orderSuccess = false,
                    state.orderError = false
            })
            .addCase(ticketCancel.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = true,
                    state.orders = [action.payload],
                    state.orderSuccessMessage = "Credits refunded successfully";
                    state.orderError = false
            })
            .addCase(ticketCancel.rejected, (state, action) => {
                state.orderLoading = false,
                    state.orderSuccess = false,
                    state.orderError = true,
                    state.orderErrorMessage = action.payload
            })

    }

})


export const { } = orderSlice.actions

export default orderSlice.reducer

export const getTickets = createAsyncThunk("FETCH/TICKETS", async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token
    if (!token) {
        return thunkAPI.rejectWithValue("User is not authenticated")
    }

    try {
        return orderService.fetchTickets(token)
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to fetch tickets"
        return thunkAPI.rejectWithValue(message)
    }
})

//Apply Coupon 
export const applyCoupon = createAsyncThunk("APPLY/COUPON", async (couponCode, thunkAPI) => {
    try {
        return await orderService.checkCoupon(couponCode)
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to apply coupon"
        return thunkAPI.rejectWithValue(message)
    }

})

//Book Ticket
export const ticketBook = createAsyncThunk("BOOK/TICKET", async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token
    if (!token) {
        return thunkAPI.rejectWithValue("User is not authenticated")
    }

    try {
        return await orderService.bookTicket(formData, token)
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to book ticket"
        return thunkAPI.rejectWithValue(message)
    }
})

//cancel Ticket
export const ticketCancel = createAsyncThunk("CANCEL/TICKET", async (tid, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token

    if (!token) {
        return thunkAPI.rejectWithValue("User is not authenticated")
    }

    try {
        return await orderService.cancelTicket(tid, token)
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to cancel ticket"
        return thunkAPI.rejectWithValue(message)
    }
})
