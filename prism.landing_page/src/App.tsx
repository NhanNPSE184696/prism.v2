import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import AboutUs from './pages/AboutUs';
import './App.css'

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Let HomePage handle all scrolling
    // Do nothing here
  }, [location.pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<HomePage />} />
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
      } catch (e) {}
    }
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
