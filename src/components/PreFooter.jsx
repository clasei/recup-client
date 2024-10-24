import { useNavigate } from 'react-router-dom'
import { scrollToTop } from "../utils/scrollToTop"
import "../assets/styles/NavbarFooter.css"


function PreFooter() {
  const navigate = useNavigate()

  return (
    <div className="pre-footer-container">
      <div className="buttons-container">
        <button onClick={scrollToTop} className="btn btn-top-again">
          Top Again.. ↑
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-back">
          wanna go back? ←
        </button>
      </div>
    </div>
  )
}

export default PreFooter