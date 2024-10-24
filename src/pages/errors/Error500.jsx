import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context' 
import PacoSleeping from '../../assets/images/PacoIsSleeping.png'

function Error500() {
  const { isLoggedIn } = useContext(AuthContext)  
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/dashboard') 
      } else {
        navigate('/')  
      }
    }, 3000)  

    return () => clearTimeout(timer)  
  }, [isLoggedIn, navigate])

  return (
    <div className="container text-center">

      <div className="dash-logo-div d-flex justify-content-center align-items-center">
        <img src={PacoSleeping} alt="paco-sleeps" className="dash-logo img-fluid" />
      </div>

      <h3>sth weird just happened</h3>
      <p>let's go to a safer place</p>
      <p>redirecting in 3, 2, 1..</p>
    </div>
  )
}

export default Error500
