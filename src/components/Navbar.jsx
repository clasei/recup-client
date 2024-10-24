import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import "../assets/styles/NavbarFooter.css"


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleNavLinkClick = () => {
    const navCollapse = document.getElementById('navbarNav')
    if (navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show')
    }
  }

  // const handleLogout = () => {
  //   localStorage.removeItem('authToken')
  //   logOutUser()
  //   navigate('/')
  // }

  const handleLogout = () => {
    const confirmLogout = window.confirm('are you sure you want to quit awesome recups for today?')

    if (confirmLogout) {
      localStorage.removeItem('authToken')
      logOutUser()
      navigate('/')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={isLoggedIn ? "/dashboard" : "/"}
          onClick={handleNavLinkClick}
        >
          recup
        </Link>

        {/* toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup" onClick={handleNavLinkClick}>
                    sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={handleNavLinkClick}>
                    log in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>
                    about
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/help" onClick={handleNavLinkClick}>
                    help
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard" onClick={handleNavLinkClick}>
                    dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contents" onClick={handleNavLinkClick}>
                    recup contents
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/created" onClick={handleNavLinkClick}>
                    created recups
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/add/new-content" onClick={handleNavLinkClick}>
                    add new recup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>
                    about
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/help" onClick={handleNavLinkClick}>
                    help
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a href="#" className="nav-link" onClick={handleLogout}> */}
                  <a href="#" className="nav-link" onClick={(e) => {
                    e.preventDefault() // avoids # to be added
                    handleLogout()
                  }}>
                    log out
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar