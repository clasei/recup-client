import { useEffect } from 'react'
import UserProfile from "../../components/users/UserProfile"

function UserProfilePage({ savedRecs }) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="user-profile container">
      <div className="row justify-content-center">
        <UserProfile savedRecs={savedRecs} /> 
      </div>
    </div>
  )
}

export default UserProfilePage
