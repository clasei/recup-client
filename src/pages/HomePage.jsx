import { Link } from 'react-router-dom'
import recupLogo from '../assets/images/recup-logo.png'

function HomePage() {


  return (
    <div className="container text-center">

      <div className="dash-logo-div d-flex justify-content-center align-items-center">
        <img src={recupLogo} alt="recup" className="dash-logo img-fluid" />
      </div>
      
      <h1 className="text-center" style={{ textTransform: 'lowercase', fontWeight: 'bold', marginBottom: '3.5rem' }}>
        welcome to <span className="recup-word">recup</span>
      </h1>
      
      <p className="lead">
        what's the difference between a review and a recommendation? anyone can write a review about a terrible movie or a disappointing book. but a recommendation? that's different.
      </p>
      <p className="lead">
        you'll only recommend the best. that's where the good stuff lives.
      </p>
      <p className="lead" style={{ fontWeight: 'bold', marginTop: '3rem', marginBottom: '2.5rem' }}>
        join the <span className="recup-word">recup</span>, <br></br> where the good stuff lives
      </p>
      

      <div className="home-buttons-container">
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
  );
}


export default HomePage;
