import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"

import { howManyDaysAgo } from "../../utils/dateUtils"
import { scrollToTop } from "../../utils/scrollToTop"
import recupMini from '../../assets/images/recup-mini.png'


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

    <div className="container my-5">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">


              <h2 className="card-title text-center" style={{ fontWeight: 'bold' }}>{recommendation.content.title}</h2>
              <p className="text-muted text-center">recup by {' '}
                <span 
                  className="link-hover"
                  onClick={() => navigate(`/users/${recommendation.creator.username}`)}>
                  {recommendation.creator.username}
                </span>
                
              </p> 
              
              <p className="text-muted text-center" style={{ fontSize: '0.75rem' }}>
              {recommendation.createdAt
                ? `added ${howManyDaysAgo(recommendation.createdAt)}`
                : "date unknown"}
              </p>
              {/* TEXT MUTED ?? */}

              

          {/* UPDATE THIS WHEN USING CLOUDINARY !!! */}
          {/* ADD IMAGE OR VIDEO ALLOWED FORMATS INFO BELOW */}
          {recommendation.content.mediaUrl && (
            <div className="text-center mb-4">
              {recommendation.content.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img
                  src={recommendation.content.mediaUrl}
                  alt="content media"
                  className="img-fluid"
                />

              // UNCOMMENT THIS IF ADDING VIDEO !!!!!!!

              // ) : recommendation.content.mediaUrl.match(/\.(mp4|webm|ogg)$/) ? (
              //   <video controls className="img-fluid">
              //     <source src={recommendation.content.mediaUrl} type="video/mp4" />
              //     your browser is having issues to process this
              //   </video>

              ) : (

                // <a href={recommendation.content.mediaUrl} target="_blank" rel="noopener noreferrer">
                //   view media
                // </a>

                null // COMMENT THIS IF ADDING VIDEO !!!!!!!
              )}
            </div>
          )}



          <h4>{recommendation.recTitle}</h4>

          
          <p><em>{recommendation.tagline}</em></p>

          <hr />

          <p>{recommendation.recText}</p>
          {/* <p className="text-muted"><em>{recommendation.recText}</em></p> */}
          {/* <p>{recommendation.recText}</p> */}

          <img src={recupMini} alt="recup" style={{ width: '75px' }} />

          <p className="text-muted text-center" style={{ fontSize: '0.75rem' }}>
            hungry? check other {' '}
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
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', width: '250px' }}>
              top again.. ↑
            </button>
          </div>

          
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default RecommendationDetailPage;
