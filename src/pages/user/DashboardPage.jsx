import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import service from "../../services/config"
import PacoIsSleeping from '../../assets/images/PacoIsSleeping.png'
import RecupCard from "../../components/recups/RecupCard"

function DashboardPage() {
  const { loggedUserId, isLoggedIn } = useContext(AuthContext)
  const [savedRecups, setSavedRecups] = useState([])
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchSavedRecups = async () => {
      try {
        if (isLoggedIn && loggedUserId) {
          const response = await service.get(`/users/${loggedUserId}/saved-recommendations`)
          setSavedRecups(response.data.savedRecs)
          setUsername(response.data.username)
        }
      } catch (error) {
        setErrorMessage("Unable to fetch saved recups.")
      }
    }

    fetchSavedRecups()
  }, [loggedUserId, isLoggedIn])

  return (
    <div className="dashboard-container" style={{ width: '100%', padding: '0.5rem' }}>
      <h1>you are finally here, {username}</h1>
      <img src={PacoIsSleeping} alt="Paco" className="paco-image" />
  
      {isLoggedIn ? (
        <>
          <h2>life is rara, <br />enjoy your saved recups <br />and Paco sleeping</h2>
  
          {savedRecups.length > 0 ? (
            <div className="row justify-content-center">
              {savedRecups
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((recommendation) => (
                  <div key={recommendation._id} className="col-md-6 col-12 d-flex justify-content-center mb-4">
                    <RecupCard 
                      recommendation={recommendation} 
                      style={{ width: '100%' }}
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
