import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"
import RecommendationCard from "../recups/RecupCard"
import { tokenPayload } from "../../utils/token" 

function UserProfile() {
  const { username } = useParams()
  const navigate = useNavigate()

  const token = localStorage.getItem("authToken")
  const currentUser = token ? tokenPayload(token).username : null


  const [userData, setUserData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (currentUser && username === currentUser) {
      navigate("/dashboard")
    }
  }, [username, currentUser, navigate])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await service.get(`/users/${username}`)
        setUserData(response.data)
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Unable to fetch user data"
        )
      }
    }

    fetchUserProfile()
  }, [username])

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>
  }

  if (!userData) {
    return <p>Loading profile...</p>
  }

  return (
    <div className="user-profile">
      <div className="user-info">
        <h2>{userData.username}</h2>
      </div>

      <div className="user-recups">
        <h4>check {userData.username} recups</h4>
        <div className="row justify-content-center">
          {userData.createdRecs.length > 0 ? (
            userData.createdRecs.map((recup) => (
              <div
                className="col-md-6 col-lg-4 d-flex justify-content-center"
                key={recup._id}
              >
                <RecommendationCard recommendation={recup} />
              </div>
            ))
          ) : (
            <p>no recups -- yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
