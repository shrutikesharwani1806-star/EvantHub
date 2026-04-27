import React from "react"
import { useAuthStatus } from "../hooks/useAuthStatus.jsx"
import Loader from "./Loader"
import { Navigate, Outlet } from "react-router-dom"

const PrivateComponent = () => {
    const { isLoggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Loader text="Checking user authentication..." />
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponent
