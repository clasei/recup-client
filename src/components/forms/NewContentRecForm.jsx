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
  const [mediaUrl, setMediaUrl] = useState("")
  const [recTitle, setRecTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [recText, setRecText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")


  // npm install react-tag-input

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


  // const handleAddition = (keyword) => {
  //   setKeywords([...keywords, keyword])
  // }

  // const handleDelete = (index) => {
  //   setKeywords(keywords.filter((_, i) => i !== index))
  // }
  
  
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
        <div className="col-md-9">
          <h1>add new content & create the 1st recommendation, yay</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>



            <h2>let's add some brand new stuff</h2>
            <div className="mb-1">
              <label htmlFor="category" className="form-label">content type</label>
              <select
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">choose which one fits better</option>
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

            {/* <div className="mb-1">
              <label htmlFor="author" className="form-label">add the content creator, or creators</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
           </div> */}
            <div className="mb-1">
              <label htmlFor="authors" className="form-label">add the content creator, or creators</label>
               <ReactTags
                 tags={authorTags}
                 handleDelete={handleAuthorDelete}
                 handleAddition={handleAuthorAddition}
                 inputFieldPosition="inline"
                 placeholder="write the creator/s"
               />
               <small className="form-text text-muted">
                type a name and press enter to add more creators
              </small>
            </div>

            {/* <div className="mb-1">
              <label htmlFor="keywords" className="form-label">Keywords (separated by commas):</label>
              <input
                type="text"
                className="form-control"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value.split(',').map(keyword => keyword.trim()))}
              />
              <small className="form-text text-muted">Separate each keyword with a comma.</small>
            </div> */}
              <div>
                <label>relevant keywords go here, choose carefully</label>
                <ReactTags
                  tags={keywordsTags}
                  handleDelete={handleKeywordDelete}
                  handleAddition={handleKeywordAddition}  // Ensure this matches exactly with the function name
                  inputFieldPosition="inline"
                  placeholder="add a keyword"
                />

                <small className="form-text text-muted">
                  type a keyword and press enter to add another
              </small>
              </div>
              
              {/* here comes cloudinary, pending */}
            <div className="mb-1">
              <label htmlFor="mediaUrl" className="form-label">Media URL:</label>
              <input
                type="text"
                className="form-control"
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
              />
            </div>



            <h2>why do you choose to make this your recup?</h2>

            <div className="mb-1">
              <label htmlFor="recTitle" className="form-label">set a title for your recommendation</label>
              <input
                type="text"
                className="form-control"
                id="recTitle"
                value={recTitle}
                onChange={(e) => setRecTitle(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tagline" className="form-label">write a tagline</label>
              <input
                type="text"
                className="form-control"
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="recText" className="form-label">feel free to ramble and share your thoughts/feelings as much as you like</label>
              <textarea
                className="form-control"
                id="recText"
                rows="7"
                value={recText}
                onChange={(e) => setRecText(e.target.value)}
                maxLength="4900" 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">let's do this</button>
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewContentRecForm
