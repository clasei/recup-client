import { useState } from "react"
import { useNavigate } from "react-router-dom"

import service from "../../services/config"
import jwt_decode from "jwt-decode" // Import for decoding JWT token

import '../../assets/styles/LoginSignup.css'

function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await service.post("/auth/signup", { email, password, username })

      // Store the token in localStorage
      const token = response.data.authToken
      localStorage.setItem("authToken", token)

      // Decode the token to get the userId and navigate to their dashboard
      const decodedToken = jwt_decode(token)
      const userId = decodedToken._id

      // Redirect user to the dashboard with the userId
      navigate(`/dashboard`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {errorMessage && <p>{errorMessage}</p>}
      
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupPage
