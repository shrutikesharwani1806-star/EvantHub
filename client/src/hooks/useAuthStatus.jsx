import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        setIsLoggedIn(Boolean(user))
        setCheckingStatus(false)
    }, [user])

    return { isLoggedIn, checkingStatus }
}
