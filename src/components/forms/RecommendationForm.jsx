import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/config"
import "../../assets/styles/RecContentForm.css"

function RecommendationForm({ contentId }) {
  const { contentId: paramContentId } = useParams() // Obtenemos desde params si es necesario
  const finalContentId = contentId || paramContentId // Prioriza el prop contentId si existe
  const navigate = useNavigate()
  const [recTitle, setRecTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [recText, setRecText] = useState("")
  const [contentTitle, setContentTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // console.log("contentId passed to form:", finalContentId)

  useEffect(() => {
    const fetchContentTitle = async () => {
      try {
        const response = await service.get(`/contents/${finalContentId}`)
        setContentTitle(response.data.title)
      } catch (error) {
        setErrorMessage("unable to fetch content details")
      }
    }

    if (finalContentId) {
      fetchContentTitle()
    }
  }, [finalContentId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await service.post(`/recommendations/content/${finalContentId}`, {
        recTitle,
        tagline,
        recText,
      })
      navigate(`/detail/${response.data.newRec._id}`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "unable to create recommendation")
    }
  }

  return (
    <div className="rec-form container my-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          {/* <h1>here comes your {contentTitle || "...hey,"} recup</h1> */}
          <h4>so, you like {contentTitle || "...this,"} right?</h4>
          

          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="recTitle" className="form-label">
                set a title for your recommendation
              </label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tagline" className="form-label">
                write a tagline
              </label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="recText" className="form-label">
                feel free to ramble and share your thoughts/feelings as much as you like
              </label>
              <textarea
                className="form-control"
                id="recText"
                rows="7"
                value={recText}
                onChange={(e) => setRecText(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">let's do this</button>
          </form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default RecommendationForm
