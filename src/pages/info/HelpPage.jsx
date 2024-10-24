import recupLogo from '../../assets/images/recup-logo.png'

function HelpPage() {
  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-8">
      

      <div className="dash-logo-div d-flex justify-content-center align-items-center">
        <img src={recupLogo} alt="recup" className="dash-logo img-fluid" />
      </div>

      <h1 className="text-center">help? you need a <span className="recup-word">recup</span></h1>

      <p className="text-center">
        If you are looking for instructions, just sign up, log in, and let the magic happen. There's nothing to be afraid of, good stuff cannot hurt you — promised.
      </p>
      <p className="text-center">
        If you are looking for someone to solve your life issues, well, not here. But great content can help. So sign up, log in, and make the magic happen. You won't regret it.
      </p>
      <p className="text-center">
        Oh, and if you are actually looking for a human to talk about recup, you can hit {' '} 
        <a href="mailto:just-recup@proton.me" className="mailto"> <span className="recup-word">recup</span> email </a>
        {' '} at any time.
      </p>

      <div className="dash-btns-container">
        <button onClick={() => navigate('/')} className="edit-btn btn btn-primary">
          safer now, going home
        </button>
      </div>

    </div>
  </div>
</div>
  )
}

export default HelpPage