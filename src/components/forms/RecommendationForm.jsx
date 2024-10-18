// components/RecommendationForm.jsx
import { useState } from "react"
import "../../assets/styles/RecContentForm.css"


function RecommendationForm({ handleSubmit }) {
  const [recTitle, setRecTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [recText, setRecText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ recTitle, tagline, recText });
  };

  return (
    <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form onSubmit={onSubmit}>
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
