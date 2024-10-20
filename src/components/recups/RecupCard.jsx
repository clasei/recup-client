import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import service from "../../services/config"

import { howManyDaysAgo } from "../../utils/dateUtils"
import { tokenPayload } from '../../utils/token'

function RecupCard({ recommendation }) {

  const token = localStorage.getItem("authToken")
  const currentUser = tokenPayload(token)._id

  // let the user now if the recup is owned or saved haha
  const [saveMessage, setSaveMessage] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  // limit textRec
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text
  }

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await service.get(`/users/${currentUser}/saved-recommendations`);
        setIsSaved(response.data.savedRecs.includes(recommendation._id));
      } catch (error) {
        console.error("Error checking saved recup:", error);
      }
    };
    checkIfSaved();
  }, [currentUser, recommendation._id]);


  // save the recup
  const handleSaveRecup = async () => {
    try {
      const response = await service.put(`/users/${currentUser}/save/${recommendation._id}`)
      // console.log(response.data.message)
      setSaveMessage(response.data.message); // here comes the success message
      setIsSaved(true)

    } catch (error) {
      console.error("Error saving recup:", error.response?.data?.message || error.message)
    }
  }

   // unsave the recup
   const handleUnsaveRecup = async () => {
    try {
      const response = await service.put(`/users/${currentUser}/unsave/${recommendation._id}`)
      setSaveMessage(response.data.message)
      setIsSaved(false)
    } catch (error) {
      console.error("Error unsaving recup:", error.response?.data?.message || error.message)
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
        {currentUser !== recommendation.creator._id && (
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
          </div>
        )}
  
        
      </div>
    </div>
  );
}

export default RecupCard;
