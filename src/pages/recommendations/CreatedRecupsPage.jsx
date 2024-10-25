import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import service from "../../services/config"
import OwnCreatedRecup from "../../components/recups/OwnCreatedRecup"
import PreFooter from "../../components/PreFooter"

function CreatedRecupsPage() {
  const { loggedUserId } = useContext(AuthContext)
  const [createdRecups, setCreatedRecups] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchCreatedRecups = async () => {
      try {
        const response = await service.get(`/recommendations/creator/${loggedUserId}`)
        setCreatedRecups(response.data)
      } catch (error) {
        setErrorMessage("Unable to fetch your created recups.")
      }
    }

    fetchCreatedRecups()
  }, [loggedUserId])

  return (

    <>
      <div className="created-recups container">
        <h1>enjoy yourself and your shared recups</h1>
        
        {createdRecups.length > 0 ? (
          <div className="created-recups-cards row justify-content-center">
            {createdRecups.map(recup => (
              <div key={recup._id} className="col-md-6 col-12 d-flex justify-content-center mb-4">
                <OwnCreatedRecup recommendation={recup} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        ) : (
          <p>no recups created.. yet</p>

          // add cta + redirect to new recup here !!!

        )}
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="w-100 d-flex justify-content-center mt-4">
      < PreFooter />
      </div>
    </>
  )
}

export default CreatedRecupsPage
