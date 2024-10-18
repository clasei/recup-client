import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

import "../../assets/styles/HomeDashboard.css"
import PacoIsSleeping from '../../assets/images/PacoIsSleeping.png'

function DashboardPage() {
  const { userId } = useContext(AuthContext)

  return (
    <div>
      <h1>you are finally here {userId} </h1>
      <img src={PacoIsSleeping} alt="Paco" />
    </div>
  );
}

export default DashboardPage
