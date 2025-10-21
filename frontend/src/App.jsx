import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Booking from './pages/Booking.jsx';
import Menu from './pages/Menu.jsx';
import Membership from './pages/Membership.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MembershipModal from './components/MembershipModal.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

function App() {
  const [isMembershipOpen, setMembershipOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header onOpenMembership={() => setMembershipOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home onBookNow={() => setMembershipOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/membership" element={<Membership />} />
          <Route
            path="/member"
            element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          />
          <Route path="/logout" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MembershipModal open={isMembershipOpen} onClose={() => setMembershipOpen(false)} />
    </div>
  );
}

export default App;
