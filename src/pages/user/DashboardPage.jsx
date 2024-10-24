import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import service from "../../services/config"
import PacoIsSleeping from '../../assets/images/PacoIsSleeping.png'
import RecupCard from "../../components/recups/RecupCard"

function DashboardPage({ savedRecs, setSavedRecs }) {
  const { loggedUserId, isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn) {
          const response = await service.get(`users/user-profile/${loggedUserId}`)
          setUserData(response.data)
          // console.log(response.data)
          setSavedRecs(response.data.savedRecs)
          // console.log(response.data.savedRecs)
        }
      } catch (error) {
        setErrorMessage("Unable to fetch user data.")
      }
    }

    fetchUserData()
  }, [loggedUserId, isLoggedIn])

  const handleEditProfileClick = () => {
    navigate("/settings");
  }

  if (!userData) {
    return <p>Loading...</p>
  }

  return (
    <div className="dashboard-container" style={{ width: '100%', padding: '0.5rem' }}>
      <h1>you are finally here, {userData.username}</h1>

      {/* <div className="paco-div">
        <img src={PacoIsSleeping} alt="Paco" className="paco-image img-fluid" />
      </div> */}

      <h3 className="user-profile-name mb-1">
        {userData.name || userData.lastName ? (
          <h3>{userData.name} {userData.lastName}</h3>
        ) : null}
      </h3>

      {userData.socialLink && (
        <p className="social-link text-center">
          <a 
            href={userData.socialLink.startsWith("http") ? userData.socialLink : `https://${userData.socialLink}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {userData.socialLink}
          </a>
        </p>
      )}
      
      {isLoggedIn ? (
        <>

        <button onClick={handleEditProfileClick} className="edit-btn btn btn-primary">
          edit your info
        </button>

        <h2>life is rara, <br />enjoy your saved recups</h2>


          {savedRecs.length > 0 ? (
            <div className="row justify-content-center mt-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {savedRecs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((recommendation) => (
                  <div key={recommendation._id} 
                    className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
                    style={{ maxWidth: '600px', minWidth: '300px' }}
                  >
                    <RecupCard 
                      loggedUserId={loggedUserId}
                      recommendation={recommendation} 
                      setSavedRecs={setSavedRecs}
                      savedRecs={savedRecs} 
                      style={{ width: '100%', minWidth: '300px' }}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <p>hey, do you know you can save your preferred recups here? 
              and only you can see them, come on, don't be shy</p>
          )}
        </>
      ) : (
        <p>you need to be logged in to see your dashboard and saved recups</p>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}

export default DashboardPage