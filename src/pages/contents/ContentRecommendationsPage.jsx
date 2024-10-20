import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecommendationCard from '../../components/cards/RecommendationCard';
import service from "../../services/config"; 

// import { scrollToTop } from "../../utils/scrollToTop"
// import recupMiniT from '../../assets/images/recup-mini-transparent.png'
import PreFooter from '../../components/PreFooter';


function ContentRecommendationsPage() {
  const { contentId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [contentTitle, setContentTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {

        const contentResponse = await service.get(`/contents/${contentId}`);
        const { title, mediaUrl } = contentResponse.data;
        setContentTitle(title);
        setMediaUrl(mediaUrl);

        const recommendationsResponse = await service.get(`/recommendations/content/${contentId}`);
        setRecommendations(recommendationsResponse.data);
      } catch (error) {
        setErrorMessage("unable to load content and recommendations");
      }
    };

    fetchRecommendations();
  }, [contentId]);

  // // simplify into one api call... -- not working xd
  // useEffect(() => {
  //   const fetchRecommendations = async () => {
  //     try {
  //       const response = await service.get(`/recommendations/content/${contentId}`);
  //       const { content, recommendations } = response.data;
  //       setContentTitle(content.title);
  //       setMediaUrl(content.mediaUrl);
  //       setRecommendations(shuffleArray(recommendations))
  //     } catch (error) {
  //       setErrorMessage("unable to load content and recommendations");
  //     }
  //   };
  
  //   fetchRecommendations();
  // }, [contentId]);
  

  return (
    <div className="container my-5">
    {errorMessage && <p className="text-danger">{errorMessage}</p>}

    <h1>{contentTitle || "Loading..."}</h1>


    {/* cloudinary goes here... */}
    {mediaUrl && (
      <div className="text-center mb-4">
        {mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
          <img
            src={mediaUrl}
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


    <div className="row justify-content-center">
      {recommendations.map((recommendation) => (
        <div className="col-md-6 col-lg-4 d-flex justify-content-center" key={recommendation._id}>
          <RecommendationCard recommendation={recommendation} />
        </div>
      ))}
    </div>

    {/* <div className="d-flex justify-content-center">
      <img 
        className="mini-logo" 
        src={recupMiniT} 
        alt="recup" 
      />
    </div>

    <div className="text-center mt-4">
      <button
        onClick={scrollToTop}
        className="btn">
        
        top again.. ↑
      </button>
    </div> */}

    <PreFooter />
    
  </div>
);
}

export default ContentRecommendationsPage;
