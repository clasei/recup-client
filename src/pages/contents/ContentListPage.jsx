import ContentListComponent from "../../components/contents/ContentListComponent";
import PreFooter from "../../components/PreFooter";

function ContentListPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <ContentListComponent />
        <PreFooter />
      </div>
    </div>
  );
}

export default ContentListPage;
