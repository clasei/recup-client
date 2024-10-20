import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"
import "../../assets/styles/RecContentForm.css"

function RecommendationForm() {
  const { contentId } = useParams() 
  const navigate = useNavigate() 
  const [recTitle, setRecTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [recText, setRecText] = useState("")
  const [contentTitle, setContentTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchContentTitle = async () => {
      try {
        const response = await service.get(`/contents/${contentId}`)
        setContentTitle(response.data.title)
      } catch (error) {
        console.log("sth went wrong fetching content:", error)
        setErrorMessage("unable to fetch content details")
      }
    }

    fetchContentTitle()
  }, [contentId]) // run effect if contentId changes


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await service.post(`/recommendations/content/${contentId}`, {
        recTitle,
        tagline,
        recText,
      })
      navigate(`/recommendations/detail/${response.data.newRec._id}`) 
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "unable to create recommendation")
    }
  }

  return (
    <div className="container my-10">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h1>recup your arguments to recommend {contentTitle || "Loading..."}</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
         
          <form onSubmit={handleSubmit}>
            
            <div className="mb-1">
              <label htmlFor="recTitle" className="form-label">set a title for your recommendation</label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tagline" className="form-label">write a tagline</label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="recText" className="form-label">feel free to ramble and share your thoughts/feelings as much as you like</label>
              <textarea
                className="form-control"
                id="recText"
                rows="7"
                value={recText}
                onChange={(e) => setRecText(e.target.value)}
                maxLength="4900" 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">let's do this</button>
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default RecommendationForm
