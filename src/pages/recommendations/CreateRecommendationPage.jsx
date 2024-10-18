import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RecommendationForm from "../../components/forms/RecommendationForm"
import service from "../../services/config"
import "../../assets/styles/RecContentForm.css"


function CreateRecommendationPage() {
  const { contentId } = useParams()
  const navigate = useNavigate()
  const [contentTitle, setContentTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchContentTitle = async () => {
      try {
        const response = await service.get(`/contents/${contentId}`)
        setContentTitle(response.data.title)
      } catch (error) {
        console.log("Error fetching content:", error)
        setErrorMessage("Failed to fetch content details.")
      }
    }

    fetchContentTitle()
  }, [contentId]) // run effect if contentId changes

  const handleSubmit = async (formData) => {
    try {
      const response = await service.post(`/recommendations/content/${contentId}`, formData)
      navigate(`/recommendations/detail/${response.data.newRec._id}`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to create recommendation.")
    }
  }

  return (
    <div className="container">
    <div className="row justify-content-center">
      {/* <div className="col-md-10">  */}
        {/* Adjust column width here */}
        <h1>Create Your Recommendation for {contentTitle || "Loading..."}</h1> {/* add spinner here */}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <RecommendationForm handleSubmit={handleSubmit} />
      {/* </div> */}
    </div>
    </div>

  )
}

export default CreateRecommendationPage

