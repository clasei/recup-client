import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import service from "../../services/config"
// import jwt_decode from "jwt-decode"
import { AuthContext } from "../../context/auth.context"

import '../../assets/styles/LoginSignup.css'

function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  
  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await service.post("/auth/signup", { email, password, username })

      const token = response.data.authToken
      localStorage.setItem("authToken", token)

      // const decodedToken = jwt_decode(token)
      // const userId = decodedToken._id

      await authenticateUser()

      navigate(`/dashboard`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "sth went wrong, try again, you've got this")
    }
  }

  return (
    <form className="signup-login" onSubmit={handleSubmit}>

      <h1>create your recup account</h1>

      <label>username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {errorMessage && <p>{errorMessage}</p>}
      
      <button type="submit" className="btn btn-primary">join the recup</button>
    </form>
  )
}

export default SignupPage
