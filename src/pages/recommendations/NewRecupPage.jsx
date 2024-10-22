import { useState, useEffect } from "react"
import service from "../../services/config"
import RecommendationForm from "../../components/forms/RecommendationForm"
import NewContentRecForm from "../../components/forms/NewContentRecForm"
import PreFooter from "../../components/PreFooter"

function NewRecupPage() {
  const [allContent, setAllContent] = useState([])
  const [searchTerm, setSearchTerm] = useState("") 
  const [selectedContent, setSelectedContent] = useState(null) 
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAllContent = async () => {
      setIsLoading(true)
      try {
        const response = await service.get("/contents")
        setAllContent(response.data) 
      } catch (error) {
        console.error("Error fetching all content", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllContent()
  }, [])

  const filteredContent = searchTerm.length >= 3 
    ? allContent.filter((content) =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <div className="new-rec-form container my-5">
      <h1 className="text-center">let's recup</h1>

      <input
        className="form-control mb-4"
        type="text"
        placeholder="write your content title here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {searchTerm.length < 3 && (
        <p className="text-center">first, check if the content you wanna recup exists in the database</p>
      )}

      {isLoading && <p className="text-center">loading content... waiting for a spinner</p>}

      {filteredContent.length > 0 ? (
        <div className="content-found ">
          <h2 className="text-center">is this what you are looking for?</h2>
          <div className="container-list w-100 d-flex justify-content-center mt-4">
          <ul className="list-unstyled text-center" style={{ marginBottom: '0'}}>
            {filteredContent.map((content) => (
              <li key={content._id} className="mb-4" style={{ marginTop: '3rem', backgroundColor: '#242526', width: '300px', padding: '1rem', borderRadius: '15px' }}>
                <h3>{content.title}</h3>
                <p>by {content.author.join(", ")}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedContent(content)}
                >
                  ready to recup
                </button>
              </li>
            ))}
          </ul>
          </div>

          {selectedContent && (
            <div className="selected-content mt-4">
              {/* <h3 className="text-center">
                add your awesome recup for {selectedContent.title}
              </h3> */}
              <RecommendationForm contentId={selectedContent._id} />
            </div>
          )}
        </div>
      ) : (
        searchTerm.length >= 3 && !isLoading && (
          <div>
            <p className="text-center">
              yay, it looks like you are gonna add some great content
            </p>
            <NewContentRecForm contentTitle={searchTerm} />
          </div>
        )
      )}

      <div className="w-100 d-flex justify-content-center mt-4">
        <PreFooter />
      </div>
    </div>
  )
}

export default NewRecupPage
