import { useParams } from "react-router-dom"
import UserProfile from "../../components/users/UserProfile"

function UserProfilePage() {
  const { username } = useParams()

  return (
    <div className="user-profile container">
      <div className="row justify-content-center">
        <UserProfile username={username} /> 
      </div>
    </div>
  );
}

export default UserProfilePage;
