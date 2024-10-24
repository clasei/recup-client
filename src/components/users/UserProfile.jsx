import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import service from "../../services/config"
import RecupCard from "../recups/RecupCard"
import PropagateLoader from "react-spinners/PropagateLoader"


function UserProfile({ setSavedRecs, savedRecs }) {
  const { username } = useParams()
  const [userRecups, setUserRecups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserRecups = async () => {
      try {
        const response = await service.get(`/users/created/${username}`)
        setUserRecups(response.data) 
      } catch (error) {
        console.error("Error fetching user recups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserRecups()
  }, [username])

  if (loading) {
    return (
      <div className="loader-container">
        <PropagateLoader height={50} color="grey" />
      </div>
    )
  }

  return (
    <div className="user-recups">
      <h1>{username}'s recups</h1>
      <div className="row justify-content-center">
        {userRecups.map((recommendation) => (
          <div key={recommendation._id} className="col-md-6 col-12 d-flex justify-content-center mt-4 mb-4">
            <RecupCard
              // don't add here anythign that u don't need..
              recommendation={recommendation}
              username={username} 
              setSavedRecs={setSavedRecs}
              savedRecs={savedRecs}
              isProfilePage={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile
