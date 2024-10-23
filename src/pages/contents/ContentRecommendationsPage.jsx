
import PreFooter from '../../components/PreFooter';
import RecupList from '../../components/recups/RecupList';


function ContentRecommendationsPage({ setSavedRecs, savedRecs }) {

  return (
    <div className="container my-5">

    <RecupList setSavedRecs={setSavedRecs} savedRecs={savedRecs} />
    <PreFooter />
    
  </div>
);
}

export default ContentRecommendationsPage;
