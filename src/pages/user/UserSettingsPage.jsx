import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import service from "../../services/config"
import { useNavigate } from "react-router-dom"

function UserSettingsPage() {
  const { loggedUserId } = useContext(AuthContext)
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    socialLink: "",
  })
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await service.get(`/users/user-profile/${loggedUserId}`)
        setUserData({
          name: response.data.name || "",
          lastName: response.data.lastName || "",
          email: response.data.email,
          socialLink: response.data.socialLink || "",
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    fetchUserData()
  }, [loggedUserId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await service.put(`/users/${loggedUserId}`, userData)
      setMessage("yay, you look updated")
      setTimeout(() => {
        navigate("/dashboard") 
      }, 2000)
    } catch (error) {
      setMessage("error updating profile..")
    }
  }

  return (
    <div className="settings-page container my-5">
      <h1>edit your info</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-control"
            // disabled // check later !!!
          />
        </div>
        <div className="form-group">
          <label htmlFor="socialLink">add preferred social link</label>
          <input
            type="text"
            id="socialLink"
            name="socialLink"
            value={userData.socialLink}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  )
}

export default UserSettingsPage