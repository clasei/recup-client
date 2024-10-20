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
      setErrorMessage(error.response?.data?.message || "sth went wrong, try again, you've got this")
    }
  }

  return (
    <form className="signup-login" onSubmit={handleSubmit}>

      <h1>log in to your recup</h1>

      <label>email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit" className="btn btn-primary">let's recup</button>
    </form>
  )
}

export default LoginPage
