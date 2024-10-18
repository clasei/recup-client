import { Routes, Route } from "react-router-dom"
import Private from "./components/auth/Private"
// import { useState, useContext } from "react" 
import './App.css'

import Navbar from "./components/Navbar" // CHANGES ?? isLoggedIn !!!
import Footer from "./components/Footer" // PUBLIC

import HomePage from "./pages/HomePage" // PUBLIC, some content + linked recs (MODALS ??) -- limited, it would be dope to show the most saved)

import AboutPage from "./pages/info/AboutPage" // PUBLIC
import HelpPage from "./pages/info/HelpPage" // PUBLIC

import LoginPage from "./pages/auth/LoginPage" // PUBLIC
import SignupPage from "./pages/auth/SignupPage" // PUBLIC

import ContentListPage from "./pages/contents/ContentListPage" // USERS ONLY, includes search !! + link to create rec
import ContentDetailPage from "./pages/contents/ContentDetailPage" // USERS ONLY, content + linked recs

import CreateRecommendationPage from "./pages/recommendations/CreateRecommendationPage" // USERS ONLY, (form)
import CreateNewContentPage from "./pages/recommendations/CreateNewContentAndRecommendationPage" // USERS ONLY, create content + recommendation (form)
import RecommendationDetailPage from "./pages/recommendations/RecommendationDetailPage" // USERS ONLY

import DashboardPage from "./pages/user/DashboardPage" // PRIVATE, access to saved recs, settings and sth else, e.g. 3 last recs created + saved ? 
import SavedRecommendationsPage from "./pages/user/SavedRecommendationsPage" // PRIVATE, only owned saved access
import UserSettingsPage from "./pages/user/UserSettingsPage" // PRIVATE 
import UserProfilePage from "./pages/user/UserProfilePage" // USERS ONLY, profile info + created recs
import RecommendationChangePage from "./pages/user/RecommendationChangePage" // PRIVATE

import AdminDashboard from "./pages/admin/AdminDashboard" // ADMIN
import ContentsManagement from "./pages/admin/ContentsManagement" // ADMIN
import RecommendationsManagement from "./pages/admin/RecommendationsManagement" // ADMIN
import UsersManagement from "./pages/admin/UsersManagement" // ADMIN

import Error500 from "./pages/errors/Error500"
import Error404 from "./pages/errors/Error404"


function App() {

  return (
    <div className="app-page">
      <Navbar />
      <div className="content">

        <Routes>
          {/* public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* users-only */}
          <Route path="/contents" element={<Private><ContentListPage /></Private>} />
          <Route path="/contents/:contentId" element={<Private><ContentDetailPage /></Private>} />
          <Route path="/recommendations/new/:contentId" element={<Private><CreateRecommendationPage /></Private>} />
          <Route path="/recommendations/new-content" element={<Private><CreateNewContentPage /></Private>} />
          <Route path="/recommendations/detail/:recommendationId" element={<Private><RecommendationDetailPage /></Private>} />
          <Route path="/users/:username" element={<Private><UserProfilePage /></Private>} />

          {/* owner-only */}
          <Route path="/dashboard" element={<Private ownerOnly={true}><DashboardPage /></Private>} />
          <Route path="/recommendations/saved" element={<Private ownerOnly={true}><SavedRecommendationsPage /></Private>} />
          <Route path="/recommendations/change/:recommendationId" element={<Private ownerOnly={true}><RecommendationChangePage /></Private>} />
          <Route path="/settings" element={<Private ownerOnly={true}><UserSettingsPage /></Private>} />

          {/* admin */}
          <Route path="/admin/dashboard" element={<Private adminOnly={true}><AdminDashboard /></Private>} />
          <Route path="/admin/contents" element={<Private adminOnly={true}><ContentsManagement /></Private>} />
          <Route path="/admin/recommendations" element={<Private adminOnly={true}><RecommendationsManagement /></Private>} />
          <Route path="/admin/users" element={<Private adminOnly={true}><UsersManagement /></Private>} />

          {/* errors */}
          <Route path="/error-500" element={<Error500 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>

      </div>
      <Footer />
    </div>
  )
}

export default App
