import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context' 
import '../../assets/styles/Loader.css'


function Error404() {
  const { isLoggedIn } = useContext(AuthContext)  
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/dashboard') 
      } else {
        navigate('/')  
      }
    }, 4200)  

    return () => clearTimeout(timer)  
  }, [isLoggedIn, navigate])

  return (
    <div className="container text-center mt-4">

      <div className="my-loader">
        <div className="rubiks-cube">
          <div className="face front">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="cube"></div>
            ))}
          </div>
          <div className="face back">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="cube"></div>
            ))}
          </div>
          <div className="face left">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="cube"></div>
            ))}
          </div>
          <div className="face right">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="cube"></div>
            ))}
          </div>
          <div className="face top">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="cube"></div>
            ))}
          </div>
          <div className="face bottom">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="cube"></div>
            ))}
          </div>
        </div>
      </div>


       <div className='lost-text mt-4'>
        <h3>everyone feels a bit lost sometimes</h3>
        <p>let's find a way</p>
        <p>redirecting in 3, 2, 1..</p>
      </div>

    </div>
  )
}

export default Error404
