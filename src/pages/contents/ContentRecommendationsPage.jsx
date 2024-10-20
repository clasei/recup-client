import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecommendationCard from '../../components/cards/RecommendationCard';
import service from "../../services/config"; 
import PreFooter from '../../components/PreFooter';
import { shuffleArray } from "../../utils/shuffleArray"



function ContentRecommendationsPage() {
  const { contentId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [contentTitle, setContentTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {

        const contentResponse = await service.get(`/contents/${contentId}`);
        const { title, mediaUrl, category, keywords } = contentResponse.data;
        setContentTitle(title);
        setMediaUrl(mediaUrl);
        setCategory(category);
        setKeywords(keywords);

        const recommendationsResponse = await service.get(`/recommendations/content/${contentId}`);
        // setRecommendations(recommendationsResponse.data);
        const shuffledRecommendations = shuffleArray(recommendationsResponse.data);
        setRecommendations(shuffledRecommendations);
      } catch (error) {
        setErrorMessage("unable to load content and recommendations");
      }
    };

    fetchRecommendations();
  }, [contentId]);


  return (
    <div className="container my-5">
    {errorMessage && <p className="text-danger">{errorMessage}</p>}

    <h1>{contentTitle || "Loading..."}</h1>

    <p className="content-category text-center">{category}</p>

    {keywords.length > 0 && (
      <div className="content-tags text-center">
        {keywords.map((keyword, index) => (
          <span key={index} className="tag-badge">{keyword}</span>
        ))}
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
