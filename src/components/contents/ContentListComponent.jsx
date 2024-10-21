import { useEffect, useState } from 'react'
import service from "../../services/config"
import ContentCard from './ContentCard';

function ContentListComponent() {


  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service.get(`/contents`)
        // if (!response.ok) {
        //   throw new Error('error fetching contents')
        // }
        setContents(response.data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData()
  }, []);


  return (
    <div className="content-list">
      <h1>find your next recup-worthy content</h1>
      {error && <p className="error-message">error: {error}</p>}
      {/* <ul>
        {contents.map((content) => (
          <li key={content._id} className="content-item">
            <h3>{content.title}</h3>
            <p><strong>category:</strong> {content.category}</p>
            <p><strong>created by:</strong> {content.author.join(', ')}</p>
          </li>
        ))}
      </ul> */}
      <div className="row">
        {contents.map((content) => (
          <div key={content._id} className="col-md-4">
            <ContentCard content={content} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentListComponent
