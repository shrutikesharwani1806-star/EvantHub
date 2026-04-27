import React from "react"
import { useSelector } from "react-redux"
import { useAuthStatus } from "../hooks/useAuthStatus.jsx"
import Loader from "./Loader"
import { Navigate, Outlet } from "react-router-dom"

const AdminPrivateComponent = () => {
    const { isLoggedIn, checkingStatus } = useAuthStatus()
    const { user } = useSelector((state) => state.auth)

    if (checkingStatus) {
        return <Loader text="Checking user authentication..." />
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    if (!user?.isAdmin) {
        return <Navigate to="/profile" />
    }

    return <Outlet />
}

export default AdminPrivateComponent
