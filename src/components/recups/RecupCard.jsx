import React from 'react'
import { Link } from 'react-router-dom'
import service from "../../services/config"

import { howManyDaysAgo } from "../../utils/dateUtils"
import { tokenPayload } from '../../utils/token'

function RecupCard({ recommendation }) {

  const token = localStorage.getItem("authToken")
  const currentUser = tokenPayload(token)._id

  // limit textRec
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text
  }

    // save the recup
    const handleSaveRecup = async () => {
      try {
        const response = await service.put(`/users/${currentUser}/save/${recommendation._id}`)
        console.log(response.data.message);
      } catch (error) {
        console.error("Error saving recup:", error.response?.data?.message || error.message)
      }
    }

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{recommendation.recTitle}</h4>
        <p className="text-muted"><em>{recommendation.tagline}</em></p>
        <p className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
          recup by {recommendation.creator.username}</p>
        <p>{getExcerpt(recommendation.recText)}</p>
        <Link to={`/recommendations/detail/${recommendation._id}`} className="btn">
          check this recup
        </Link>

        {/* Check if the logged-in user is not the creator of this recup */}
        {currentUser !== recommendation.creator._id && (
          <button className="btn btn-save mt-2" onClick={handleSaveRecup}>
            Save Recup
          </button>
        )}
  
        <p className="days-ago text-muted text-center" style={{ fontSize: '0.7rem' }}>
              {recommendation.createdAt
                ? `added ${howManyDaysAgo(recommendation.createdAt)}`
                : "date unknown"}
              </p>
      </div>
    </div>
  );
}

export default RecupCard;
