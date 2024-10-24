import { Link } from 'react-router-dom'
import recupLogo from '../assets/images/recup-logo.png'

function HomePage() {


  return (
    <div className="limit-container container">

      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="dash-logo-div d-flex justify-content-center align-items-center">
            <img src={recupLogo} alt="recup" className="dash-logo img-fluid" />
          </div>
          
          <h1 className="text-center" style={{ textTransform: 'lowercase', fontWeight: 'bold', marginBottom: '3rem' }}>
            welcome to <span className="recup-word">recup</span>
          </h1>

          <p className="text-center">
            <strong>let's talk about <span className="recup-word">recup</span></strong>
          </p>
          
          <p className="text-center">
            what's the difference between a review and a recommendation? anyone can write a review about a terrible movie or a disappointing book. but a recommendation? that's different.
          </p>

          <p className="text-center">
          and you can find a lot of different recommendations, but you know that only a few truly come from and go to the heart. well, <strong>now you know what a <span className="recup-word">recup</span> is</strong>.
          </p>

          <p className="text-center">
            so, from now on, when you find something truly great, you share a <span className="recup-word">recup</span> — it's your way of passing along the good stuff.
          </p>
          <p className="text-center">
            a <span className="recup-word">recup</span> is your personal stamp of worthiness, your way of saying this really matters, this is a life-saver. because some things are just too good not to share.
          </p>

          <p className="text-center">
          <strong>and you'll only <span className="recup-word">recup</span> the best</strong>
          </p>

          <p className="lead" style={{ fontWeight: 'bold', marginTop: '3rem', marginBottom: '2.5rem' }}>
            join the <span className="recup-word">recup</span>, <br></br> where the good stuff lives
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
