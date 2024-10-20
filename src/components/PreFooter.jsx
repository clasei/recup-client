import { useNavigate } from 'react-router-dom'

import { scrollToTop } from "../utils/scrollToTop"
import recupMiniT from '../assets/images/recup-mini-transparent.png'

// function PreFooter() {
//   const navigate = useNavigate()

//   return (

//     <div>
//       <div className="d-flex justify-content-center">
//         <img 
//           className="mini-logo" 
//           src={recupMiniT} 
//           alt="recup" 
//         />
//       </div>

//       <div className="btn btn-top-again text-center mt-4">
//         <button
//           onClick={scrollToTop}
//           className="btn">
          
//           top again.. ↑
//         </button>

//         <button
//           className="btn btn-back text-center mt-4"
//           onClick={() => navigate(-1)}
//         >
//           wanna go back? ←
//       </button>
//       </div> 
      
//     </div>
//   );
// }

// export default PreFooter;

function PreFooter() {
  const navigate = useNavigate();

  return (
    <div className="pre-footer-container">
      {/* <div className="logo-container">
        <img className="mini-logo" src={recupMiniT} alt="Recup" />
      </div> */}
      <div className="buttons-container">
        <button onClick={scrollToTop} className="btn btn-top-again">
          Top Again.. ↑
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-back">
          wanna go back? ←
        </button>
      </div>
    </div>
  );
}

export default PreFooter;