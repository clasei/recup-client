import { Link } from 'react-router-dom'
import { howManyDaysAgo } from "../../utils/dateUtils"

function OwnCreatedRecup({ recommendation }) {
  // Helper to limit text for display
  const getExcerpt = (text) => {
    return text.length > 120 ? text.substring(0, 120) + '...' : text
  }

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{recommendation.recTitle}</h3>
        <p className="text-muted">
          <em>{recommendation.tagline}</em>
        </p>

        <>
          <p>{getExcerpt(recommendation.recText)}</p>
        </>

        <p
          className="days-ago text-muted text-center"
          style={{ fontSize: "0.7rem" }}
        >
          {recommendation.createdAt
            ? `[ added ${howManyDaysAgo(recommendation.createdAt)} ]`
            : "date unknown"}
        </p>
        
        <Link to={`/edit/${recommendation._id}`} className="btn btn-primary">
          update
        </Link>
      </div>
    </div>
  );
}

export default OwnCreatedRecup;
