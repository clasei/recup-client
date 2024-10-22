import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import service from "../../services/config"

import PreFooter from '../../components/PreFooter'

function EditRecupPage() {
  const { recommendationId } = useParams()
  const navigate = useNavigate()

  const [recup, setRecup] = useState({
    recTitle: "",
    tagline: "",
    recText: ""
  })

  useEffect(() => {
    const fetchRecup = async () => {
      try {
        const response = await service.get(`/recommendations/${recommendationId}`)
        setRecup(response.data)

        console.log(response.data)
        // navigate(`/recommendations/detail/${recommendationId}`)
      } catch (error) {
        console.error("Error fetching recup", error)
      }
    }

    fetchRecup()
  }, [recommendationId])


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await service.put(`/recommendations/${recommendationId}`, recup)  
      navigate(`/recommendations/detail/${recommendationId}`)
    } catch (error) {
      console.error("Error updating recup", error)
    }
  }

  return (
    <div className="rec-form container my-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h1>change of feelings?</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="recTitle" className="form-label">set a title for your recommendation</label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recup.recTitle}
                onChange={(e) => setRecup({ ...recup, recTitle: e.target.value })}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tagline" className="form-label">write a tagline</label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={recup.tagline}
                onChange={(e) => setRecup({ ...recup, tagline: e.target.value })}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="recText" className="form-label">feel free to share your thoughts/feelings</label>
              <textarea
                className="form-control"
                id="recText"
                rows="7"
                value={recup.recText}
                onChange={(e) => setRecup({ ...recup, recText: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">update your recup</button>
          </form>
        </div>
        <div className="w-100 d-flex justify-content-center mt-4">
          <PreFooter />
        </div>
      </div>
    </div>
  )
}

export default EditRecupPage
