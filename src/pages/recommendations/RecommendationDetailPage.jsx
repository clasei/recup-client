import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"

import { howManyDaysAgo } from "../../utils/dateUtils"
import { scrollToTop } from "../../utils/scrollToTop"
import recupMiniT from '../../assets/images/recup-mini-transparent.png'
import PreFooter from '../../components/PreFooter';


function RecommendationDetailPage() {
  const navigate = useNavigate()
  const { recommendationId } = useParams()
  const [recommendation, setRecommendation] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")




  useEffect(() => {
    const fetchRecommendationDetails = async () => {
      try {
        const response = await service.get(`/recommendations/${recommendationId}`)
        setRecommendation(response.data)
      } catch (error) {
        setErrorMessage("unable to fetch recommendation details")
      }
    };

    fetchRecommendationDetails()
  }, [recommendationId])

  if (!recommendation) {
    return <p>loading...</p> // spinner here
  }


  return (

    <div className="container my-5 d-flex justify-content-center">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      
       <div className="card shadow-sm">

    <h2 className="card-title text-center" style={{ fontWeight: 'bold' }}>{recommendation.content.title}</h2>
    
    <p className="text-muted text-center">recup by {' '}
      <span 
        className="link-hover"
        onClick={() => navigate(`/users/${recommendation.creator.username}`)}>
        {recommendation.creator.username}
      </span>
    </p>

    <p className="text-muted text-center" style={{ fontSize: '0.7rem' }}>
      {recommendation.createdAt
        ? `added ${howManyDaysAgo(recommendation.createdAt)}`
        : "date unknown"}
    </p>

    {recommendation.content.mediaUrl && (
      <div className="text-center mb-4">
        {recommendation.content.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
          <img
            src={recommendation.content.mediaUrl}
            alt="content media"
            className="img-fluid"
          />
        ) : null}
      </div>
    )}

    <h4>{recommendation.recTitle}</h4>
    <p><em>{recommendation.tagline}</em></p>
    <hr />
    <p>{recommendation.recText}</p>

    <div className="d-flex justify-content-center">
      <img 
        className="mini-logo" 
        src={recupMiniT} 
        alt="recup" 
      />
    </div>

    <p className="text-muted text-center" 
      style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}
    >
      hungry? good, check other {' '}
      <span 
        className="link-hover"
        onClick={() => navigate(`/contents/recommendations/${recommendation.content._id}`)}>
        {recommendation.content.title}
        {' '} recups
      </span>
    </p>

    <div className="text-center mt-4">
      <button
        onClick={scrollToTop}
        className="btn">
        top again.. ↑
      </button>
    </div>

{/* <PreFooter /> */}
  </div>

  
</div>

  );
}

export default RecommendationDetailPage;
