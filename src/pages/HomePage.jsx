import { useEffect } from "react"
import { Link } from 'react-router-dom'
import recupLogo from '../assets/images/recup-logo.png'

function HomePage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="limit-container container">

      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="dash-logo-div d-flex justify-content-center align-items-center mt-4">
            <img src={recupLogo} alt="recup" className="dash-logo img-fluid" />
          </div>
          
          <h1 className="text-center" style={{ textTransform: 'lowercase', 
            fontWeight: 'bold', marginBottom: '1rem' }}>
            welcome to <span className="recup-word">recup</span>
          </h1>

          <p className="lead" style={{ fontWeight: 'bold', marginTop: '0', marginBottom: '3.7rem' }}>
            where the good stuff lives
          </p>

          <p className="text-center" style={{ fontStyle: 'italic' }}>
            <strong>let's talk about <span className="recup-word">recup</span></strong>
          </p>
          
          <p className="text-center">
            what's the difference between a review and a recommendation? anyone can write a review about a terrible movie or a disappointing book. but a recommendation? that's different.
          </p>

          <p className="text-center">
          and you can find a lot of different recommendations, but you know that only a few truly come from and go to the heart. well, <strong>now you know what a <span className="recup-word">recup</span> is</strong>.
          </p>

          <p className="text-center">
            so, from now on, when you find something truly great, you share a <span className="recup-word">recup</span> — <strong>it's your way of passing along the good stuff</strong>.
          </p>
          <p className="text-center">
            a <span className="recup-word">recup</span> is your personal stamp of worthiness, your way of saying this really matters, this is a life-saver. <strong>because some things are just too good not to share</strong>.
          </p>

          <p className="text-center" style={{ fontStyle: 'italic' }}>
          <strong>and you'll only <span className="recup-word">recup</span> the best</strong>
          </p>

          <p className="lead" style={{ fontWeight: 'bold', marginTop: '3.5rem', marginBottom: '2.5rem' }}>
            be bold,  <br></br>join the <span className="recup-word">recup</span>
          </p>
          

          <div className="home-buttons-container d-flex flex-column align-items-center">
            <Link to="/signup" className="home-btn btn btn-primary">sign up</Link>
            <Link to="/login" className="home-btn btn btn-primaryy">log in</Link>
          </div>


          {/* check later */}

          {/* <div className="text-center mt-5">
            <Link to="/contents">
              <button className="btn btn-primary">
                see recups
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}


export default HomePage;
