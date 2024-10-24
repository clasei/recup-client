import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"
import RecupCard from "../recups/RecupCard"
import PropagateLoader from "react-spinners/PropagateLoader"
import { AuthContext } from "../../context/auth.context"


function UserProfile({ setSavedRecs, savedRecs }) {
  const { username } = useParams()
  const [userRecups, setUserRecups] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { loggedUserId } = useContext(AuthContext)
  const [loggedUsername, setLoggedUsername] = useState("")

  useEffect(() => {
    const fetchLoggedUsername = async () => {
      try {
        const response = await service.get(`/users/user-profile/${loggedUserId}`)
        setLoggedUsername(response.data.username)
        console.log(response.data.username)
      } catch (error) {
        console.error("Error fetching logged user data:", error);
      }
    };

    if (loggedUserId) {
      fetchLoggedUsername()
    }
  }, [loggedUserId])

  // useEffect(() => {
  //   const fetchUserRecups = async () => {
  //     try {
  //       const response = await service.get(`/users/created/${username}`)
  //       setUserRecups(response.data) 
  //     } catch (error) {
  //       console.error("Error fetching user recups:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchUserRecups()
  // }, [username])

  useEffect(() => {
    if (loggedUsername, loggedUsername === username) {
      alert("hey you look pretty fine, here you can check your own recups")
      navigate(`/created`)
    } else {

      const fetchUserRecups = async () => {
        try {
          const response = await service.get(`/users/created/${username}`);
          setUserRecups(response.data);
        } catch (error) {
          console.error("Error fetching user recups:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserRecups();
    }
  }, [username, loggedUsername, navigate, loggedUserId])

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
