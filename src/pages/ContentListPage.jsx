import { useEffect, useState } from 'react'
import '../assets/styles/ContentListDetail.css'

function ContentListPage() {
  const [contents, setContents] = useState([])
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contents`)
        if (!response.ok) {
          throw new Error('sth is not working fine, dont panic')
        }
        const data = await response.json()
        setContents(data);
      } catch (error) {
        setError(error.message)
      }
    };

    fetchData()
  }, []);

  return (
    <div className="content-list">
      <h1>do u see this?</h1>
      {error && <p className="error-message">this is not working: {error}</p>}
      <ul>
        {contents.map(content => (
          <li key={content._id} className="content-item">
            {content.title} - {content.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentListPage
