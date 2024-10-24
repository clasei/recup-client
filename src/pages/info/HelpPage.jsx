import recupLogo from '../../assets/images/recup-logo.png'

function HelpPage() {
  return (
    <div className="limit-container container">
      <div className="row justify-content-center">
       <div className="col-md-8">
      

        <div className="dash-logo-div d-flex justify-content-center align-items-center">
          <img src={recupLogo} alt="recup" className="dash-logo img-fluid" />
        </div>

        <h1 className="text-center">help? you need a <span className="recup-word">recup</span></h1>

        <p className="text-center" style={{ textTransform: 'lowercase'}}>
          If you are looking for instructions, just <strong>sign up, log in, and let the magic happen</strong>. There's nothing to be afraid of, good stuff cannot hurt you — promised.
        </p>
        <p className="text-center" style={{ textTransform: 'lowercase'}}>
          If you are looking for someone to solve your life issues, well, not here. But great content can help. So <strong>
            sign up, log in, and make the magic happen</strong>. You won't regret it.
        </p>
        <p className="text-center" style={{ textTransform: 'lowercase'}}>
          Oh, and if you are actually looking for a human to talk about recup, you can hit {' '} 
          <a href="mailto:just-recup@proton.me" className="mailto"> <span className="recup-word">recup</span> email </a>
          {' '} at any time.
        </p>

        <p className="lead" style={{ textTransform: 'lowercase', fontWeight: 'bold', marginTop: '3rem', marginBottom: '2.5rem' }}>
          Help is coming, <br></br>good stuff is just a <span className="recup-word">recup</span> away
        </p>

      <div className="dash-btns-container d-flex flex-column align-items-center">
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