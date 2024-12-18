import { useState, useEffect, useContext } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import service from "../../services/config"
import { AuthContext } from "../../context/auth.context"
import '../../assets/styles/LoginSignup.css'


function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await service.post("/auth/login", { email, password })

      const token = response.data.authToken
      localStorage.setItem("authToken", token)

      await authenticateUser()

      navigate(`/dashboard`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "sth went wrong, try again, you've got this")
    }
  }

  return (
    <form className="signup-login" onSubmit={handleSubmit}>

      <h1>sign in to recup</h1>

      <label>email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <label>password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" className="btn btn-primary">let's recup</button>

      <div className="footer-links d-flex align-items-center justify-content-center mt-3" style={{ gap: '5px' }}>
        <span>not in yet?</span>
        <NavLink to="/signup">join the recup</NavLink>
      </div>

    </form>
  )
}

export default LoginPage
