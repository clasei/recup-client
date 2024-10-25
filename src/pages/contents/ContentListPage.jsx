import { useEffect } from 'react'
import ContentListComponent from "../../components/contents/ContentListComponent"
import PreFooter from "../../components/PreFooter"

function ContentListPage({ setSavedRecs, savedRecs }) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <ContentListComponent setSavedRecs={setSavedRecs} savedRecs={savedRecs} />
        <PreFooter />
      </div>
    </div>
  )
}

export default ContentListPage
