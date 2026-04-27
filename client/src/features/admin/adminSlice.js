import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import adminService from "./adminService"


const initialState = {
    users : [],
    events : [],
    orders : [],
    ratings : [],
    coupons : [],
    edit : {event : {} , isEdit : false},
    adminLoading : false,
    adminSuccess : false,
    adminError : false,
    adminErrorMessage : ""
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        removeUser: (state, action) => {
            state.users = state.users.filter((user) => (user._id || user.id) !== action.payload);
        },

        editEvent : (state, action) => {
            return {
                ...state,
                edit : {event: action.payload, isEdit: true}
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(getAllUsers.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.users = action.payload,
            state.adminError = false
        })
        .addCase(getAllUsers.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(getAllEvents.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(getAllEvents.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.events = action.payload,
            state.adminError = false
        })
        .addCase(getAllEvents.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(getAllOrders.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(getAllOrders.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.orders = action.payload,
            state.adminError = false
        })
        .addCase(getAllOrders.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(getAllRatings.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(getAllRatings.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.ratings = action.payload,
            state.adminError = false
        })
        .addCase(getAllRatings.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(getAllCoupons.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(getAllCoupons.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.coupons = action.payload,
            state.adminError = false
        })
        .addCase(getAllCoupons.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(addCoupon.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(addCoupon.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.coupons = [action.payload , ...state.coupons],
            state.adminError = false
        })
        .addCase(addCoupon.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(addEventAdmin.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(addEventAdmin.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.events = [action.payload , ...state.events],
            state.adminError = false
        })
        .addCase(addEventAdmin.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(updateEventAdmin.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(updateEventAdmin.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.events = state.events.map(event => event._id === action.payload ? action.payload : event)
            state.edit = {event : {} , isEdit: false}
            state.adminError = false
        })
        .addCase(updateEventAdmin.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(userUpdate.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(userUpdate.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.users = state.users.map(user => user._id === action.payload ? action.payload : user)
            state.adminError = false
        })
        .addCase(userUpdate.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
        .addCase(couponUpdate.pending, (state , action) => {
            state.adminLoading = true,
            state.adminSuccess = false,
            state.adminError = false
        })
        .addCase(couponUpdate.fulfilled, (state ,action) => {
            state.adminLoading = false,
            state.adminSuccess = true,
            state.coupons = state.coupons.map(coupon => coupon._id === action.payload ? action.payload : coupon)
            state.adminError = false
        })
        .addCase(couponUpdate.rejected, (state , action) => {
            state.adminLoading = false,
            state.adminSuccess = false,
            state.adminError = true,
            state.adminErrorMessage = action.payload
        })
    }
    
})

export const { removeUser, editEvent } = adminSlice.actions

export default adminSlice.reducer

export const getAllUsers = createAsyncThunk("FETCH/ADMIN/USERS" , async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllUsers(token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllEvents = createAsyncThunk("FETCH/ADMIN/EVENTS" , async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllEvents(token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllOrders = createAsyncThunk("FETCH/ADMIN/ORDERS" , async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllOrders(token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllRatings = createAsyncThunk("FETCH/ADMIN/RATINGS" , async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllRatings(token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllCoupons = createAsyncThunk("FETCH/ADMIN/COUPONS" , async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllCoupons(token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const addCoupon = createAsyncThunk("ADD/ADMIN/COUPON" , async(formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.createCoupon(formData , token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const addEventAdmin = createAsyncThunk("ADD/ADMIN/EVENT" , async(formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.createEvent(formData , token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateEventAdmin = createAsyncThunk("UPDATE/ADMIN/EVENT" , async(formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.updateEvent(formData , token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }

})

export const userUpdate = createAsyncThunk("ADMIN/UPDATE/USER" , async(update, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.updateUser(update , token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }


})

export const couponUpdate = createAsyncThunk("ADMIN/UPDATE/COUPON" , async(update, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.updateCoupon(update , token)
        
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }


})