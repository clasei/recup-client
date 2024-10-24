import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"
import RecupCard from "../recups/RecupCard"
import PropagateLoader from "react-spinners/PropagateLoader"
import { AuthContext } from "../../context/auth.context"


function UserProfile({ setSavedRecs, savedRecs }) {
  const { username } = useParams()
  const [userRecups, setUserRecups] = useState([])
  const [userProfileName, setUserProfileName] = useState('')
  const [userProfileLastName, setUserProfileLastName] = useState('')
  const [userProfileSocialLink, setUserProfileSocialLink] = useState('')


  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { loggedUserId } = useContext(AuthContext)
  const [loggedUsername, setLoggedUsername] = useState("")

  // const [userProfileData, setUserProfileData] = useState({})

  useEffect(() => {
    const fetchLoggedUsername = async () => {
      try {
        const response = await service.get(`/users/user-profile/${loggedUserId}`)
        setLoggedUsername(response.data.username)
        // console.log(response.data.username)
        // setUserData(response.data)
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
      alert("hey you look pretty fine, let's check your awesome recups")
      navigate(`/created`)
    } else {

      const fetchUserRecups = async () => {
        try {
          const response = await service.get(`/users/created/${username}`);
          setUserRecups(response.data.createdRecs)
          setUserProfileName(response.data.name)
          setUserProfileLastName(response.data.lastName)
          setUserProfileSocialLink(response.data.socialLink)
          console.log(response.data.socialLink)
          // console.log(response.data.createdRecs)
          // setUserProfileData({
          //   name: response.data.name,
          //   lastName: response.data.lastName
          // })
          // console.log(response.data.name)
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

      {/* // CHECK THIS LATER !!! */}

      {/* <h3>
        {userProfileData.name || userProfileData.lastName
          ? `${userProfileData.name} ${userProfileData.lastName}`
          : ''}
      </h3> */}

      <h3 className="user-profile-name mb-1">
        {userProfileName || userProfileLastName
          ? `${userProfileName} ${userProfileLastName }`
          : ''}
      </h3>

      {/* <p>{`${userProfileSocialLink}`}</p> */}
      

      {userProfileSocialLink && (
        <p className="social-link text-center">
          <a 
            // trick to use properly and add http..
            href={userProfileSocialLink.startsWith("http") ? userProfileSocialLink : `https://${userProfileSocialLink}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {`${userProfileSocialLink}`}
          </a>
        </p>
      )}

      <p className="total-created text-center">
        {userRecups.length} created recups
      </p>
      
      <div className="row justify-content-center">
        {userRecups.map((recommendation) => (
          <div key={recommendation._id} className="col-md-6 col-12 d-flex justify-content-center mt-4 mb-4">
            <RecupCard
              // don't add here anythign that u don't need..
              loggedUserId={loggedUserId}
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
