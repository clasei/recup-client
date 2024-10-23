import { useParams } from "react-router-dom"
import UserProfile from "../../components/users/UserProfile"

function UserProfilePage({ savedRecs }) {
  const { username } = useParams()

  return (
    <div className="user-profile container">
      <div className="row justify-content-center">
        <UserProfile username={username} savedRecs={savedRecs} /> 
      </div>
    </div>
  );
}

export default UserProfilePage;
