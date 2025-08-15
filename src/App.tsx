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
import ProtectedRoute from './components/ProtectedRoute';

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



          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/study" element={<Study />} />
          </Route>

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
