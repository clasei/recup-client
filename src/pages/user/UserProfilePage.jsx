import UserProfile from "../../components/users/UserProfile"

function UserProfilePage({ savedRecs }) {

  return (
    <div className="user-profile container">
      <div className="row justify-content-center">
        <UserProfile savedRecs={savedRecs} /> 
      </div>
    </div>
  );
}

export default UserProfilePage;
