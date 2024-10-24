import recupLogo from '../../assets/images/recup-logo.png'
import { useNavigate } from 'react-router-dom'


function AboutPage() {

  const navigate = useNavigate()
  
  return (
    <div className="limit-container container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          

          <div className="dash-logo-div d-flex justify-content-center align-items-center mt-4">
            <img src={recupLogo} alt="recup" className="dash-logo img-fluid" />
          </div>

          <h1 className="text-center">about <span className="recup-word">recup</span></h1>

          <p className="text-center" style={{ textTransform: 'lowercase'}}>
            Once upon a time, on a planet called Earth, strange creatures roamed—often judgmental, lazy, and untrusting. But luckily, they were also capable of being pretty awesome.
          </p>
          <p className="text-center" style={{ textTransform: 'lowercase'}}>
            In a not-so-futile attempt to highlight what truly matters, some decided to create good — sometimes even great — things. And what made it even better was that there were others, just as human, eager to share these invaluable treasures with those around them, saving time and maybe even lives.
          </p>
          <p className="text-center" style={{ textTransform: 'lowercase'}}>
            This is why <span className="recup-word">recup</span> exists: to make good things happen, easily. Because the good, my friend, is all around you—and let’s just say, it can be you too.
          </p>

          <p className="lead" style={{ textTransform: 'lowercase', fontWeight: 'bold', marginTop: '3rem', marginBottom: '2.5rem' }}>
            So be brave and go for it, <br></br>join the  <span className="recup-word">recup</span>
          </p>

          <div className="dash-btns-container d-flex flex-column align-items-center">
            <button onClick={() => navigate('/')} className="edit-btn btn btn-primary">
              i'm in, take me home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
