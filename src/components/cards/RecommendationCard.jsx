import React from 'react'
import { Link } from 'react-router-dom'

function RecommendationCard({ recommendation }) {

  // limit textRec
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{recommendation.recTitle}</h4>
        <p className="text-muted"><em>{recommendation.tagline}</em></p>
        <p className="text-muted">By: {recommendation.creator.username}</p>
        <p>{getExcerpt(recommendation.recText)}</p>
        <Link to={`/recommendations/detail/${recommendation._id}`} className="btn btn-primary">
          Are you ready for more?
        </Link>
      </div>
    </div>
  );
}

export default RecommendationCard;
