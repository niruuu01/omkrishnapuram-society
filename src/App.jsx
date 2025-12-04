import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RedevelopmentProject from './pages/RedevelopmentProject';
import Committee from './pages/Committee';
import AdminPanel from './pages/AdminPanel';
import MembersLogin from './pages/MembersLogin';
import './App.css';

function App() {
  const { pathname } = useLocation();
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if member token exists on mount
  useEffect(() => {
    const memberToken = localStorage.getItem('memberToken');
    if (memberToken) {
      setIsMemberLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleMemberLogin = () => {
    setIsMemberLoggedIn(true);
  };

  const handleMemberLogout = () => {
    localStorage.removeItem('memberToken');
    localStorage.removeItem('memberLoginTime');
    setIsMemberLoggedIn(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show login page
  if (!isMemberLoggedIn) {
    return <MembersLogin onLoginSuccess={handleMemberLogin} />;
  }

  // If logged in, show main app
  return (
    <div className="app relative">
      {/* Global background image (building) */}
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80')] bg-cover bg-center -z-10" />

      <div className="relative z-10">
        <Navbar onLogout={handleMemberLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/redevelopment" element={<RedevelopmentProject />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
