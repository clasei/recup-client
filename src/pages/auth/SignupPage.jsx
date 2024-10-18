import { useState } from "react"
import { useNavigate } from "react-router-dom"

import service from "../../services/config"
import jwt_decode from "jwt-decode"

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

      const token = response.data.authToken
      localStorage.setItem("authToken", token)

      const decodedToken = jwt_decode(token)
      const userId = decodedToken._id

      navigate(`/dashboard`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>Create Your Account</h1>

      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {errorMessage && <p>{errorMessage}</p>}
      
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupPage
