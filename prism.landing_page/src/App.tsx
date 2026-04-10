import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import HomePage from './pages/HomePage';
import Test from './pages/Test';
import useTrackRoute from './useTrackRoute';
// import AboutUs from './pages/AboutUs';
import './App.css'

function AppContent() {
  const location = useLocation();
  useTrackRoute();

  useEffect(() => {
    // Let HomePage handle all scrolling
    // Do nothing here
  }, [location.pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<HomePage />} />
        <Route path="/qa" element={<HomePage />} />
        <Route path="/test" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/test-start" element={<Test />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
      </Routes>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Disable browser automatic scroll restoration so we control it
    if ('scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {
        // Ignore errors - some browsers may not support this property
      }
    }
  }, []);

  return (
    <Router>
      <AppContent />
      <Analytics />
      <SpeedInsights/>
    </Router>
  )
}

export default App
