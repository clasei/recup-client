import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function Private({ children, adminOnly = false, ownerOnly = false }) {

  const { isLoggedIn, isAdmin, loggedUserId } = useContext(AuthContext)

  // user only
  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  // owner only
  if (ownerOnly && loggedUserId !== loggedUserId) {
    return <Navigate to="/" />
  }

  // admin only
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />
  }

  // renders the componenet when previous conditions are matched
  return children
}

export default Private