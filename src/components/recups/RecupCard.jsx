import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import service from "../../services/config"
import { howManyDaysAgo } from "../../utils/dateUtils"


function RecupCard({ loggedUserId, recommendation, setSavedRecs, savedRecs, isDetailPage = false, isProfilePage }) {

  const [saveRecupMessage, setSaveRecupMessage] = useState("")
  const [isSaved, setIsSaved] = useState(false)


  // limit textRec --- dont remove !!!
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text
  }


  useEffect(() => {
    console.log('double check if they match:', savedRecs, recommendation._id)
    if (savedRecs.some(savedRec => savedRec._id === recommendation._id)) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }, [])
  
  

  // save the recup
  const handleSaveRecup = async () => {
    try {
      const response = await service.put(`/users/${loggedUserId}/save/${recommendation._id}`)
      setSaveRecupMessage(response.data.message)
      setIsSaved(true)

      setSavedRecs(prev => [...prev, recommendation._id])
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

      setSavedRecs(prev => prev.filter(id => id !== recommendation._id))
    } catch (error) {
      setSaveRecupMessage(error.response?.data?.message || "couldn't unsave recup")
    }
  }

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{recommendation.recTitle}</h3>
        <p className="text-muted">
          <em>{recommendation.tagline}</em>
        </p>

        {!isDetailPage && (
          <>
            <p>{getExcerpt(recommendation.recText)}</p>

            <p className="username-link text-muted" style={{ fontWeight: "bold" }}>
              recup by {' '}

              {isProfilePage ? (
                recommendation.creator.username
              ) : (
                <NavLink to={`/users/${recommendation.creator.username}`}>
                  {recommendation.creator.username}
                </NavLink>
              )}
            </p>

            <p
              className="days-ago text-muted text-center"
              style={{ fontSize: "0.7rem" }}
            >
              {recommendation.createdAt
                ? `[ added ${howManyDaysAgo(recommendation.createdAt)} ]`
                : "date unknown"}
            </p>

            <NavLink to={`/detail/${recommendation._id}`} className="btn">
              check this recup
            </NavLink>
          </>
        )}
          <>
            {loggedUserId !== recommendation.creator._id && (
              <div
                className="save-icon"
                onClick={isSaved ? handleUnsaveRecup : handleSaveRecup}
                style={{ cursor: "pointer" }}
              >
                {isSaved ? (
                  <svg
                    className="save-recup-on"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#fce149"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v12l6-3 6 3V2z" />
                  </svg>
                ) : (
                  <svg
                    className="save-recup-off"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="grey"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v12l6-3 6 3V2z" />
                  </svg>
                )}

              </div>
            )}
          </>
        
      </div>
    </div>
  )
}

export default RecupCard