import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Blogs from "./pages/home/Blogs";
import Course from "./pages/home/Course";
import TestSeries from "./pages/home/TestSeries";
import StudyMaterial from "./pages/home/StudyMaterial";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/Forgot";
import Register from "./pages/Auth/Register";
import Batches from "./pages/Batches/Batches";
import LibraryPage from "./pages/Library/LibraryPage";
import StorePage from "./pages/Store/StorePage";
import TseriesPage from "./pages/TestSeries/TseriesPage";

import Profile from "./pages/Dashboard/Profile";
import Study from "./pages/Dashboard/Study";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/course" element={<Course />} />
          <Route path="/test-series" element={<TestSeries />} />
          <Route path="/study-material" element={<StudyMaterial />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/register" element={<Register />} />

          {/* Main Pages Routes */}
          <Route path="/batches" element={<Batches />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/test-series-page" element={<TseriesPage />} />

          {/* Dashboard Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/study" element={<Study />} />

          {/* Redirect from /home to root */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Catch all route - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
