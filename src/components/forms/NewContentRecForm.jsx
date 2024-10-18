import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from 'react-tag-input'
import service from "../../services/config";
import "../../assets/styles/RecContentForm.css"; 


function NewContentRecForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [recTitle, setRecTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [recText, setRecText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  // npm install react-tag-input
  const handleAddition = (keyword) => {
    setKeywords([...keywords, keyword]);
  };

  const handleDelete = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };
  
  
  // content and recommendation submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post("/recommendations/new-content", {
        category,
        title,
        author,
        keywords: keywords.map((keyword) => keyword.text), // trying to add keywords with new library...
        mediaUrl,
        recTitle,
        tagline,
        recText,
      });


      navigate(`/recommendations/detail/${response.data.newRec._id}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to create content and recommendation.");
    }
  };

  return (
    <div className="container my-10">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h1>Add New Content & First Recommendation</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>



            <h2>Content Details</h2>
            <div className="mb-1">
              <label htmlFor="category" className="form-label">Category:</label>
              <select
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                <option value="book">Book</option>
                <option value="comic">Comic</option>
                <option value="film">Film</option>
                <option value="podcast">Podcast</option>
                <option value="series">Series</option>
                <option value="song">Song</option>
                <option value="videogame">Video Game</option>
              </select>
            </div>

            <div className="mb-1">
              <label htmlFor="title" className="form-label">Content Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="author" className="form-label">Author:</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            {/* <div className="mb-1">
              <label htmlFor="keywords" className="form-label">Keywords (separated by commas):</label>
              <input
                type="text"
                className="form-control"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value.split(',').map(keyword => keyword.trim()))}
              />
              <small className="form-text text-muted">Separate each keyword with a comma.</small>
            </div> */}
              <div>
                <label>Keywords:</label>
                <ReactTags
                  tags={keywords}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  inputFieldPosition="inline"
                  placeholder="Add a keyword"
                />
              </div>
              
            <div className="mb-1">
              <label htmlFor="mediaUrl" className="form-label">Media URL:</label>
              <input
                type="text"
                className="form-control"
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
              />
            </div>



            <h2>Recommendation Details</h2>
            <div className="mb-1">
              <label htmlFor="recTitle" className="form-label">Recommendation Title:</label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tagline" className="form-label">Tagline:</label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="recText" className="form-label">Recommendation Text:</label>
              <textarea
                className="form-control"
                id="recText"
                rows="7"
                value={recText}
                onChange={(e) => setRecText(e.target.value)}
                maxLength="4900" 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewContentRecForm;
