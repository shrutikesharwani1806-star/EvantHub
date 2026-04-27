import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService"

let userExist = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: userExist || null,
    profileData: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true,
                    state.isSuccess = false,
                    state.isError = false
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.user = action.payload,
                    state.isError = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true,
                    state.isSuccess = false,
                    state.isError = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.user = action.payload,
                    state.isError = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.isError = false,
                    state.message = "",
                    state.user = null
            })
            .addCase(getProfile.pending, (state, action) => {
                state.isLoading = true,
                    state.isSuccess = false,
                    state.isError = false
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.profileData = action.payload,
                    state.isError = false
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = false,
                    state.isError = true,
                    state.message = action.payload
            })
    }
})

export const { } = authSlice.actions

export default authSlice.reducer

export const registerUser = createAsyncThunk("AUTH/REGISTER", async (formData, thunkAPI) => {

    try {
        return await authService.register(formData)
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})


//login user

export const loginUser = createAsyncThunk("AUTH/LOGIN", async (formData, thunkAPI) => {

    try {
        return await authService.login(formData)
    } catch (error) {
        let message = error.response?.data?.message || error.message || "Something went wrong"
        return thunkAPI.rejectWithValue(message)
    }
})


//logout user

export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
    localStorage.removeItem('user')
})


//Get Profile
export const getProfile = createAsyncThunk("GET/PROFILE", async (uid, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await authService.fetchProfile(uid, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})