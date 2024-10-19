import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecommendationCard from '../../components/cards/RecommendationCard';
import service from "../../services/config"; 

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
        ) : mediaUrl.match(/\.(mp4|webm|ogg)$/) ? (
          <video controls className="img-fluid">
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
            View Media
          </a>
        )}
      </div>
    )}


    <div className="row">
      {recommendations.map((recommendation) => (
        <div className="col-md-6" key={recommendation._id}>
          <RecommendationCard recommendation={recommendation} />
        </div>
      ))}
    </div>
    
  </div>
);
}

export default ContentRecommendationsPage;
