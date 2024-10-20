import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { WithContext as ReactTags } from 'react-tag-input'
import service from "../../services/config"

import "../../assets/styles/RecContentForm.css" 


function NewContentRecForm() {
  const navigate = useNavigate()
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [authorTags, setAuthorTags] = useState([])
  const [keywordsTags, setKeywordsTags] = useState([])
  // const [mediaUrl, setMediaUrl] = useState("")
  // here comes cloudinary...
  const [mediaUrl, setMediaUrl] = useState(null) // url from Cloudinary
  const [isUploading, setIsUploading] = useState(false) // loading spinner

  const [recTitle, setRecTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [recText, setRecText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")


  // npm install react-tag-input...
  const handleAuthorAddition = (tag) => {
    setAuthorTags([...authorTags, tag])
  }
  const handleAuthorDelete = (index) => {
    const newTags = authorTags.slice(0)
    newTags.splice(index, 1)
    setAuthorTags(newTags)
  }

  const handleKeywordAddition = (tag) => {
    setKeywordsTags([...keywordsTags, tag])
  }
  const handleKeywordDelete = (index) => {
    const newKeywords = keywordsTags.slice(0)
    newKeywords.splice(index, 1)
    setKeywordsTags(newKeywords)
  }

  // cloudinary again...
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)

    const uploadData = new FormData()
    uploadData.append("image", file)

    try {
      const response = await service.post("/upload/media", uploadData) // Upload to Cloudinary via the backend
      setMediaUrl(response.data.mediaUrl)
      setIsUploading(false)
    } catch (error) {
      console.error("Error uploading image:", error)
      setIsUploading(false)
    }
  }
    
  
  // content and recommendation submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await service.post("/recommendations/new-content", {
        category,
        title,
        author: authorTags.map((authorTags) => authorTags.text), // mapping author tags
        keywords: keywordsTags.map((keywordTags) => keywordTags.text), // mapping keyword tags
        mediaUrl,
        recTitle,
        tagline,
        recText,
      })
  
      navigate(`/recommendations/detail/${response.data.newRec._id}`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "unable to create content and recommendation")
    }
  }
  

  return (
    <div className="container my-10">
      <div className="row justify-content-center">
        <div className="container-form">
          <h1>feeling brave? <br></br> 
          you are in the right place</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>


          <p className="custom-emoji"> 🎈 </p>


            <h2>let's add some brand new stuff</h2>
            <div className="mb-1">
              <label htmlFor="category" className="form-label">content type</label>
              <select
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">click & choose which one fits better</option>
                <option value="book">book</option>
                <option value="comic">comic</option>
                <option value="film">film</option>
                <option value="podcast">podcast</option>
                <option value="series">series</option>
                <option value="song">song</option>
                <option value="videogame">videogame</option>
              </select>
            </div>

            <div className="mb-1">
              <label htmlFor="title" className="form-label">write the content title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-1">
              <label htmlFor="authors" className="form-label">add the content creator or creators</label>
               <ReactTags
                 tags={authorTags}
                 handleDelete={handleAuthorDelete}
                 handleAddition={handleAuthorAddition}
                 inputFieldPosition="inline"
                 placeholder="creator/s"
               />
               <small className="form-text">
                type a name and <span style={{ color: 'pink', fontWeight: 'bold' }}>press enter</span> to add more creators
              </small>
            </div>

              <div>
                <label htmlFor="authors" className="form-label">add relevant keywords, choose carefully</label>
                <ReactTags
                  
                  tags={keywordsTags}
                  handleDelete={handleKeywordDelete}
                  handleAddition={handleKeywordAddition}
                  inputFieldPosition="inline"
                  placeholder="add a keyword"
                />

                <small className="form-text">
                  type a keyword and <span style={{ color: 'pink', fontWeight: 'bold' }}>press enter</span> to add another
              </small>
              </div>
              
            {/* <div className="mb-1">
              <label htmlFor="mediaUrl" className="form-label">Media URL:</label>
              <input
                type="text"
                className="form-control"
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
              />
            </div> */}

            {/* here comes cloudinary */}
            <div className="mb-1">
              <label htmlFor="media" className="form-label">drop here a good image for this content</label>
              <input type="file" className="form-control" id="media" onChange={handleFileUpload} disabled={isUploading} />
              {isUploading && <h3>... uploading image</h3>}
              {mediaUrl && <img src={mediaUrl} alt="Preview" width={200} />}
              <small className="form-text">
                allowed formats: .png, .jpg
              </small>
            </div>


            {/* <hr className="custom-hr" /> */}
            <p className="custom-emoji"> 🤓 </p>


            <h2>it's recup time</h2>

            <div className="mb-1">
              <label htmlFor="recTitle" className="form-label">set a title for your recup</label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tagline" className="form-label">write a catchy tagline</label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="recText" className="form-label">
                why do you choose to make this 1st recup?
                </label>
              <textarea
                className="form-control"
                id="recText"
                rows="7"
                value={recText}
                onChange={(e) => setRecText(e.target.value)}
                maxLength="4900" 
              ></textarea>
              <small className="form-text">
                feel free to ramble and share your thoughts/feelings 
                and arguments to go all in for this content
              </small>
            </div>
            <button type="submit" className="btn btn-primary">let's do this</button>
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewContentRecForm
