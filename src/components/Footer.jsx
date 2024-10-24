// import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import recupMiniT from '../assets/images/recup-mini-transparent.png'
import "../assets/styles/NavbarFooter.css"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer d-flex flex-column align-items-center py-1">
      <NavLink to="/" className="footer-logo">
        <img src={recupMiniT} alt="Recup logo" className="footer-logo-img" />
      </NavLink>
      <span className="footer-recup mt-2">
        <NavLink className="mx-2" to="/">recup</NavLink> 
      </span>
      <span className="footer-text">where the good stuff lives</span>

      {/* <span className="footer-contact align-items-center">
      <a href="mailto:just-recup@proton.me">
          <svg className="footer-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="16" fill="grey">
            <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </span> */}

    <span className="footer-links d-flex align-items-center">
      <NavLink className="mx-2" to="/">home</NavLink>
      |
      <NavLink className="mx-2" to="/help">help</NavLink>
      |
      <NavLink className="mx-2" to="/about">about</NavLink> 
      |
      
      <div className="contact-pack">
        <a href="mailto:just-recup@proton.me" className="d-flex align-items-center">
          {/* contact */}
          <svg className="footer-svg mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="grey">
            <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>
    </span>

      {/* <span className="footer-year">{currentYear} </span> */}
      <span className="footer-year d-flex align-items-center">
       {'<'}from {' '}
        {currentYear}
        {' '} to the future and beyond {' />'}
        {/* {' '} 
        (mit)       */}
      </span>
    </footer>
  )
}

export default Footer
