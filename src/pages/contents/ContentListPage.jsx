import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/RecContentForm.css";
import service from "../../services/config";

function RecommendationForm() {
  const { contentId } = useParams(); // Get contentId from URL params
  const navigate = useNavigate(); // For redirect after successful form submission
  const [recTitle, setRecTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [recText, setRecText] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch content title
  useEffect(() => {
    const fetchContentTitle = async () => {
      try {
        const response = await service.get(`/api/contents/${contentId}`);
        setContentTitle(response.data.title); // Set the content title
      } catch (error) {
        console.log("Error fetching content:", error);
        setErrorMessage("Failed to fetch content details.");
      }
    };

    fetchContentTitle(); // Fetch when component mounts
  }, [contentId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post(`/api/recommendations/content/${contentId}`, {
        recTitle,
        tagline,
        recText,
      });
      navigate(`/recommendations/detail/${response.data.newRec._id}`); // Redirect to the new recommendation's detail page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to create recommendation.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1>Create Your Recommendation for {contentTitle || "Loading..."}</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="recTitle" className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tagline" className="form-label">Tagline:</label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="recText" className="form-label">Recommendation Text:</label>
              <textarea
                className="form-control"
                id="recText"
                rows="5"
                value={recText}
                onChange={(e) => setRecText(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecommendationForm;
