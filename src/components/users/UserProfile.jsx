import { useState, useEffect } from "react"
import service from "../../services/config"
import RecupCard from "../recups/RecupCard"

function UserProfile({ username, setSavedRecs, savedRecs }) {
  const [userRecups, setUserRecups] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserRecups = async () => {
      try {
        const response = await service.get(`/users/created/${username}`)
        setUserRecups(response.data) 
      } catch (error) {
        console.error("Error fetching user recups:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserRecups()
  }, [username])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="user-recups">
      <h1>{username}'s recups</h1>
      <div className="row">
        {userRecups.map((recommendation) => (
          <div key={recommendation._id} className="col-12 col-sm-6 col-md-4">
            <RecupCard
              loggedUserId={loggedUserId}
              recommendation={recommendation}
              // username={username} 
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
