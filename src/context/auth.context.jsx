import { createContext, useEffect, useState } from "react"
import service from "../services/config"
import PropagateLoader from "react-spinners/PropagateLoader"

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)


  // avoid authentication if there's no token to allow access to public pages
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      authenticateUser()
    } else {
      setLoading(false)
    }
  }, [])

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify")
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)  // userId comes from token
      setIsAdmin(response.data.role === "admin") // change state to admin
    } catch (error) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAdmin(false)

      // stops loading after verification / validation 
    } finally {
      setLoading(false)
    }
  }

  const passedContext = {
    isLoggedIn,
    isAdmin,
    loggedUserId,
    authenticateUser,
  }

  if (loading) {
    return (
      <div className="loader-container">
        <PropagateLoader height={50} color="grey" />
      </div>
    )
  }

  return <AuthContext.Provider value={passedContext}>{props.children}</AuthContext.Provider>
}

export { AuthContext, AuthWrapper }
