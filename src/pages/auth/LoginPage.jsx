import { useState } from "react"
import { useNavigate } from "react-router-dom"

import service from "../../services/config"
import jwt_decode from "jwt-decode"

import '../../assets/styles/LoginSignup.css'

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await service.post("/auth/login", { email, password })

      const token = response.data.authToken
      localStorage.setItem("authToken", token) 

      const decodedToken = jwt_decode(token)
      const userId = decodedToken._id

      navigate(`/dashboard`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>Login to Your Account</h1>

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Log In</button>
    </form>
  )
}

export default LoginPage
