import { useEffect } from "react"
import NewContentRecForm from "../../components/forms/NewContentRecForm"
import PreFooter from "../../components/PreFooter"

function CreateNewContentAndRecommendationPage() {

  useEffect(() => {
    window.scrollTo(0, 0) // make page start at the begginning..
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-center" >
        <h1>
          feeling brave? <br></br>
          you are in the right place
        </h1>
        <NewContentRecForm />
        <PreFooter />
      </div>
    </div>
  )
}

export default CreateNewContentAndRecommendationPage
