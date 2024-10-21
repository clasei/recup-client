import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import service from "../../services/config"

import { howManyDaysAgo } from "../../utils/dateUtils"
// import { tokenPayload } from '../../utils/token'
import { AuthContext } from "../../context/auth.context" 

function RecupCard({ recommendation }) {

  // const token = localStorage.getItem("authToken")
  // const currentUser = tokenPayload(token)._id

  const { loggedUserId } = useContext(AuthContext)

  // let the user now if the recup is owned or saved haha
  const [saveRecupMessage, setSaveRecupMessage] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  // limit textRec
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text
  }


  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await service.get(`/users/${loggedUserId}/saved-recommendations`)
        setIsSaved(response.data.savedRecs.includes(recommendation._id))
      } catch (error) {
        console.error("error checking saved recup:", error)
      }
    }
    checkIfSaved()
  }, [loggedUserId, recommendation._id])


  // save the recup
  const handleSaveRecup = async () => {
    try {
      const response = await service.put(`/users/${loggedUserId}/save/${recommendation._id}`)
      setSaveRecupMessage(response.data.message)
      setIsSaved(true)
    } catch (error) {
      setSaveRecupMessage(error.response?.data?.message || "unable to save recup")
    }
  }

   // unsave the recup
  const handleUnsaveRecup = async () => {
    try {
      const response = await service.put(`/users/${loggedUserId}/unsave/${recommendation._id}`)
      setSaveRecupMessage(response.data.message)
      setIsSaved(false)
    } catch (error) {
      setSaveRecupMessage(error.response?.data?.message || "couldn't unsave recup")
    }
  }

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{recommendation.recTitle}</h3>
        <p className="text-muted"><em>{recommendation.tagline}</em></p>
        <p>{getExcerpt(recommendation.recText)}</p>

        <hr></hr>

        <p className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
          recup by {' '}
          {recommendation.creator.username}
          </p>
        
        <p className="days-ago text-muted text-center" style={{ fontSize: '0.7rem' }}>
            {recommendation.createdAt
              ? `[ added ${howManyDaysAgo(recommendation.createdAt)} ]`
              : "date unknown"}
        </p>
       
        <Link to={`/recommendations/detail/${recommendation._id}`} className="btn">
          check this recup
        </Link>

        {/* check if the user is the owner or saved this before */}
        {/* {currentUser !== recommendation.creator._id && (
          <button className="btn btn-save mt-2" onClick={handleSaveRecup}>
            Save Recup
          </button>
        )} */}

        {/* lets add some bookmarks !!! */}
        {loggedUserId !== recommendation.creator._id && (
          // <div className="save-icon" onClick={handleSaveRecup} style={{ cursor: 'pointer' }}>
          <div className="save-icon" onClick={isSaved ? handleUnsaveRecup : handleSaveRecup} style={{ cursor: 'pointer' }}>
            {isSaved ? (
              <svg className="save-recup-on" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                fill="#4CB1F9" 
                viewBox="0 0 16 16">
                <path d="M2 2v12l6-3 6 3V2z" />
              </svg>
            ) : (
              <svg className="save-recup-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                fill="grey" 
                viewBox="0 0 16 16">
                <path d="M2 2v12l6-3 6 3V2z" />
              </svg>
            )}

            {/* shows if its done or it has failed... check this later !!! */}
            {/* option 1: change server message, option 2: manage error properly in the front */}
            {/* {saveRecupMessage && <p className="save-message">{saveRecupMessage}</p>} */}

          </div>

          
        )}
  
        
      </div>
    </div>
  );
}

export default RecupCard;
