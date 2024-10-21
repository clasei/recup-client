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
    <div className="content-card card mb-4 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{content.title}</h3>
        <p className="text-muted">{content.category}</p> {/* // use tags better? */}
        {/* <p className="text-muted"><strong>added by:</strong> {content.creator.username}</p> // check if this makes sense */}

        {/* users to do sth else than this? */}
        {isContentOwner && (
          // <button className="btn btn-warning">
          //   request edit {/* // redirect to contact/email or whatever */}
          // </button>
                  <a href="mailto:recup@dobeesdream.com" className="request-edit">
                    request edit
                  <svg className="footer-svg mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="grey">
                    <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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
