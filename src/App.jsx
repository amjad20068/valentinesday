import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import RoseDay from './pages/RoseDay';
import ProposeDay from './pages/ProposeDay';
import ChocolateDay from './pages/ChocolateDay';
import TeddyDay from './pages/TeddyDay';
import PromiseDay from './pages/PromiseDay';
import HugDay from './pages/HugDay';
import KissDay from './pages/KissDay';
import ValentinesDay from './pages/ValentinesDay';
import Customize from './pages/Customize';

// A wrapper component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App Component with Providers
function App() {
  return (
    <Router>
      <UserProvider>
        <AudioProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="rose-day" element={<RoseDay />} />
              <Route path="propose-day" element={<ProposeDay />} />
              <Route path="chocolate-day" element={<ChocolateDay />} />
              <Route path="teddy-day" element={<TeddyDay />} />
              <Route path="promise-day" element={<PromiseDay />} />
              <Route path="hug-day" element={<HugDay />} />
              <Route path="kiss-day" element={<KissDay />} />
              <Route path="valentines-day" element={<ValentinesDay />} />
              <Route path="customize" element={<Customize />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AudioProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
