import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RecupCard from '../../components/recups/RecupCard'
import service from "../../services/config" 

import { AuthContext } from '../../context/auth.context'

import { shuffleArray } from "../../utils/shuffleArray"
// import ScaleLoader from "react-spinners/ScaleLoader"
import PropagateLoader from "react-spinners/PropagateLoader"


function RecupList({ setSavedRecs, savedRecs }) {
  const { loggedUserId } = useContext(AuthContext)
  const { contentId } = useParams()
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState([])
  const [contentTitle, setContentTitle] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [category, setCategory] = useState("")
  const [keywords, setKeywords] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [recommendedContentIds, setRecommendedContentIds] = useState([]) 

  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchRecommendations = async () => {

      try {

        const contentResponse = await service.get(`/contents/${contentId}`)
        const { title, mediaUrl, category, keywords } = contentResponse.data
        setContentTitle(title)
        setMediaUrl(mediaUrl)
        setCategory(category)
        setKeywords(keywords)

        const recommendationsResponse = await service.get(`/recommendations/content/${contentId}`)
        // setRecommendations(recommendationsResponse.data)
        const shuffledRecommendations = shuffleArray(recommendationsResponse.data)
        setRecommendations(shuffledRecommendations)


        // setLoading(false)

        // MAKE SURE YOU WANT TO KEEP THIS BEFORE DEPLOYMENT !!! ADAPT TIME IF NEEDED !!!
        // adding setTimeout to enjoy the spinner xd
        setTimeout(() => {
          setLoading(false)
        }, 1000)
        
      } catch (error) {
        setErrorMessage("unable to load content and recommendations")
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [contentId])


    // fetch user CREATED RECS to check if content is already recommended..
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await service.get(`/users/user-profile/${loggedUserId}`)
          const createdRecs = response.data.createdRecs
          const recommendedIds = createdRecs.map(rec => rec.content._id)
          setRecommendedContentIds(recommendedIds)
        } catch (error) {
          console.error("error fetching user profile:", error)
        }
      }
  
      if (loggedUserId) {
        fetchUserProfile()
      }
    }, [loggedUserId])
  
    // --------------------------------------

  const isCreated = recommendedContentIds.includes(contentId)

  if (loading) {
    return (
      <div className="loader-container">
        <PropagateLoader height={50} color="grey" />
      </div>
    )
  }


  return (
    <div className="container my-5">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h1 className='content-title-recups mb-2'>{contentTitle || "Loading..."}</h1>

      <p className="content-category text-center mt-2">{category}</p>

      {keywords.length > 0 && (
        <div className="content-tags text-center">
          {keywords.map((keyword, index) => (
            <span key={index} className="tag-badge">
              {keyword}
            </span>
          ))}
        </div>
      )}

      {/* CONDITIONAL BUTTON FOR CREATING A NEW RECUP */}
      {!isCreated && (
        <div className="text-center mt-4 mb-3">
          <button className="content-btn btn btn-primary" onClick={() => navigate(`/add/new/${contentId}`)}>
            do your own recup
          </button>
        </div>
      )}

      {/* cloudinary goes here... */}
      {mediaUrl && (
        <div className="image-container text-center mb-4">
          {/* {mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? ( */}
          {mediaUrl.match(/\.(jpeg|jpg|png)$/) ? (
            <img
              src={mediaUrl}
              alt="content media"
              className="img-fluid rounded-img"
            />
          ) : // UNCOMMENT THIS IF ADDING VIDEO !!!!!!!

          // ) : recommendation.content.mediaUrl.match(/\.(mp4|webm|ogg)$/) ? (
          //   <video controls className="img-fluid">
          //     <source src={recommendation.content.mediaUrl} type="video/mp4" />
          //     your browser is having issues to process this
          //   </video>

          // <a href={recommendation.content.mediaUrl} target="_blank" rel="noopener noreferrer">
          //   view media
          // </a>

          null // COMMENT THIS IF ADDING VIDEO !!!!!!!
          }
        </div>
      )}

      <div className="row justify-content-center">
        {recommendations.map((recommendation) => (
          <div
            className="col-md-6 col-lg-4 d-flex justify-content-center"
            key={recommendation._id}
          >
            <RecupCard
              loggedUserId={loggedUserId}
              recommendation={recommendation}
              setSavedRecs={setSavedRecs}
              savedRecs={savedRecs}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecupList
