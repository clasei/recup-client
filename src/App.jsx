import { Routes, Route } from "react-router-dom";
// import { useState, useContext } from "react"; 

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ContentListPage from "./pages/SearchAllPage"; // includes search !! + link to create rec
import ContentDetailPage from "./pages/ContentDetailPage"; // content + linked recs
import CreateRecommendationPage from "./pages/CreateRecommendationPage"; // (form)
import CreateNewContentPage from "./pages/CreateNewContentPage"; // create content + recommendation (form)
import SavedRecommendationsPage from "./pages/SavedRecommendationsPage"; // private, only own saved visible
import UserProfilePage from "./pages/UserProfilePage"; // profile info + created recs
// import SettingsPage from "./pages/SettingsPage"; // needed ??
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import Error404 from "./pages/Error404";

function App() {

  return (
    <div className="app-page">
      <Navbar />
      <div className="content">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contents" element={<ContentListPage />} />
          <Route path="/contents/:contentId" element={<ContentDetailPage />} />
          <Route path="/recommendations/new/:contentId" element={<CreateRecommendationPage />} />
          <Route path="/recommendations/new-content" element={<CreateNewContentPage />} />
          <Route path="/users/:userId/recommendations/saved" element={<SavedRecommendationsPage />} />
          <Route path="/users/:userId" element={<UserProfilePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
