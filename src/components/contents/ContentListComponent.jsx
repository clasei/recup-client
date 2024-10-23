import { useEffect, useState, useContext } from 'react'
import { shuffleArray } from "../../utils/shuffleArray"
import service from "../../services/config"
import ContentCard from './ContentCard';
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthContext } from "../../context/auth.context" 


function ContentListComponent({ setSavedRecs, savedRecs }) {

  const { loggedUserId } = useContext(AuthContext)
  

  const [contents, setContents] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentsResponse = await service.get(`/contents`)
        // if (!response.ok) {
        //   throw new Error('error fetching contents')
        // }

        // setContents(response.data)

        const shuffledContents= shuffleArray(contentsResponse.data);
        setContents(shuffledContents);

        // setLoading(false);

        // MAKE SURE YOU WANT TO KEEP THIS BEFORE DEPLOYMENT !!! ADAPT TIME IF NEEDED !!!
        // adding setTimeout to enjoy the spinner xd
        setTimeout(() => {
          setLoading(false)
        }, 1000)

      } catch (error) {
        setErrorMessage("unable to load recommendations by content")
        setLoading(false);
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loader-container">
        <PropagateLoader height={50} color="grey" />
      </div>
    );
  }


  return (
    <div className="content-list container">
      <h1>find your next recup-worthy content</h1>
      {error && <p className="error-message">error: {error}</p>}
      <div className="row justify-content-center">
        {contents.map((content) => (
          <div key={content._id} className="col-md-6 col-12 d-flex justify-content-center mb-4">
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

    </div>
  );
}

export default ContentListComponent
