import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import "../../assets/styles/ContentListDetail.css"

function ContentCard({ content, isCreated }) {

  const { loggedUserId } = useContext(AuthContext)
  // console.log(loggedUserId)
  const navigate = useNavigate()

  // if (!loggedUserId) {
  //   return <p>Loading...</p>
  // }

  const isContentOwner = loggedUserId === content.firstRecommendationCreator._id

  // const handleAddRecup = () => {

  //   navigate(`/add/new/${content._id}`)
  // }

  const handleAddRecup = () => {
    if (isCreated) {
      alert("you want to update your previous recup? let's do that")
      navigate(`/created`)
    } else {
      navigate(`/add/new/${content._id}`)
    }
  }
  

  return (
    <div className="content-card card mb-4">
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/contents/recups/${content._id}`}>
            {content.title}
          </Link>
        </h3>

        {content.author.length > 0 && (
          <p className="text-muted" style={{ fontWeight: 'bold'}}>
            {content.author.join(", ")}
          </p>
        )}


        <p className="text-muted">{content.category}</p> {/* // use tags better? */}
        {/* <p className="text-muted"><strong>added by:</strong> {content.creator.username}</p> // check if this makes sense */}

        {content.keywords.length > 0 && (
          <div className="content-tags text-center">
            {content.keywords.map((keyword, index) => (
              <span 
                key={index} 
                className="tag-badge" 
                style={{ fontSize: '0.7rem' }}
              >
              {keyword}</span>
            ))}
          </div>
        )}

        {content.mediaUrl && (
          // <div className="content-img text-center mb-4 justify-content-center align-items-center">
          <div className="content-img text-center mb-4">
            <Link to={`/contents/recups/${content._id}`}>
            {content.mediaUrl.match(/\.(jpeg|jpg|png)$/) && (
              <img
                src={content.mediaUrl}
                alt="content media"
                className="img-fluid"
                style={{ width: '100%' }} 
              />
            )}
            </Link>
          </div>
        )}

        <div className="text-center">
          <button className="content-btn btn btn-primary" onClick={handleAddRecup}>
            do your recup
          </button>
        </div>

        <div className="text-center">
        <Link to={`/contents/recups/${content._id}`}>
          <button className="content-btn btn btn-primary">
            see recups
          </button>
         </Link>
        </div>

        

        {/* users to do sth else than this? */}
        {isContentOwner && (
          // <button className="btn btn-warning">
          //   request edit {/* // redirect to contact/email or whatever */}
          // </button>

                  // <a href="mailto:just-recup@proton.me" className="request-edit">
                  <a 
                    href={`mailto:just-recup@proton.me?subject=Edit%20Content%20Request&body=hey%20this%20content%20I%20added%20needs%20to%20be%20edited%20ID:%20${content._id}`} 
                    className="request-edit"
                  >
                    request edit
                  <svg
                    className="edit-svg mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="grey"
                  >
                    <path d="M3 21v-3.75l11.25-11.25 3.75 3.75L6.75 21H3zm17.71-13.29c.19-.19.29-.44.29-.71 0-.28-.1-.52-.29-.71l-2-2c-.19-.19-.43-.29-.71-.29-.26 0-.52.1-.71.29L16.75 5.75l3.75 3.75 1.21-1.21z"/>
                  </svg>
                </a>
        )}


        {/* can users report content ??? via form or email -- CHECK THIS LATER !!! */}
        {/* {!isContentOwner && (
          <button className="btn btn-primary">
            !!
          </button>
        )} */}

      </div>
    </div>
  )
}

export default ContentCard
