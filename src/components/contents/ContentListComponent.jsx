import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import service from "../../services/config"
import { shuffleArray } from "../../utils/shuffleArray"
import ContentCard from './ContentCard'
import PropagateLoader from "react-spinners/PropagateLoader"
import { AuthContext } from "../../context/auth.context" 


function ContentListComponent({ setSavedRecs, savedRecs }) {

  const { loggedUserId } = useContext(AuthContext)
  const navigate = useNavigate()
  

  const [contents, setContents] = useState([])
  // const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredContents, setFilteredContents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentsResponse = await service.get(`/contents`)
        // if (!response.ok) {
        //   throw new Error('error fetching contents')
        // }

        // setContents(response.data)

        const shuffledContents= shuffleArray(contentsResponse.data)
        setContents(shuffledContents)

        // setLoading(false)

        // MAKE SURE YOU WANT TO KEEP THIS BEFORE DEPLOYMENT !!! ADAPT TIME IF NEEDED !!!
        // adding setTimeout to enjoy the spinner xd
        setTimeout(() => {
          setLoading(false)
        }, 1000)

      } catch (error) {
        setErrorMessage("unable to load recommendations by content")
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  useEffect(() => {
    if (searchTerm.length >= 3) {
      setFilteredContents(
        contents.filter((content) =>
          content.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setFilteredContents(contents)
    }
  }, [searchTerm, contents])


  if (loading) {
    return (
      <div className="loader-container">
        <PropagateLoader height={50} color="grey" />
      </div>
    )
  }


  return (
    <div className="content-list container">

      <h1>find your next recup-worthy content</h1>
      <input
        className="form-control mb-4"
        type="text"
        placeholder="looking for a special title?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", maxWidth: '500px', margin: '0 auto' }}
      />

      <div className="row justify-content-center">
        {filteredContents.map((content) => (
          <div key={content._id} className="col-md-6 col-12 d-flex justify-content-center mt-4 mb-4">
            <ContentCard 
              loggedUserId={loggedUserId}
              setSavedRecs={setSavedRecs}
              savedRecs={savedRecs} 
              content={content} 
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </div>
      <div className="pre-footer-container">

      <div className="new-content">

        <button onClick={() => navigate('/add/new-content')} className="btn btn-primary">
          recup new content
        </button>

        
      </div>
    </div>

    </div>
  )
}

export default ContentListComponent
