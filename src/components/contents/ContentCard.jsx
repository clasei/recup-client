import { useContext } from 'react'
import { AuthContext } from "../../context/auth.context"
import "../../assets/styles/ContentListDetail.css"

function ContentCard({ content }) {

  const { loggedUserId } = useContext(AuthContext)
  console.log(loggedUserId)

  // if (!loggedUserId) {
  //   return <p>Loading...</p>
  // }

  const isContentOwner = loggedUserId === content.firstRecommendationCreator._id

  return (
    <div className="content-card card mb-4">
      <div className="card-body">
        <h3 className="card-title">{content.title}</h3>
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
          <div className="text-center mb-4">
            {content.mediaUrl.match(/\.(jpeg|jpg|png)$/) && (
              <img
                src={content.mediaUrl}
                alt="content media"
                className="img-fluid"
              />
            )}
          </div>
        )}

        {/* users to do sth else than this? */}
        {isContentOwner && (
          // <button className="btn btn-warning">
          //   request edit {/* // redirect to contact/email or whatever */}
          // </button>

                  // <a href="mailto:recup@dobeesdream.com" className="request-edit">
                  <a 
                    href={`mailto:recup@dobeesdream.com?subject=Edit%20Content%20Request&body=hey%20this%20content%20I%20added%20needs%20to%20be%20edited%20ID:%20${content._id}`} 
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
  );
}

export default ContentCard
