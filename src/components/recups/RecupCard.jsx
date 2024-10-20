import React from 'react'
import { Link } from 'react-router-dom'

import { howManyDaysAgo } from "../../utils/dateUtils"

function RecupCard({ recommendation }) {

  // limit textRec
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

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
