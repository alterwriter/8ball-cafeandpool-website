import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/booking', label: 'Booking' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About Us' },
];

function Header({ onOpenMembership }) {
  const { isAuthenticated, profile, clearSession } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">8</span>
          <span className="brand-text">Ball Cafe &amp; Pool</span>
        </Link>
        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          {isAuthenticated && profile ? (
            <Link to="/member" className="chip">
              <span>{profile.fullName.split(' ')[0]}</span>
              <span className="chip-sub">{profile.tier} Member</span>
            </Link>
          ) : null}
          <button type="button" className="button primary" onClick={onOpenMembership}>
            {isAuthenticated ? 'Kelola Membership' : 'Login / Sign Up'}
          </button>
          {isAuthenticated ? (
            <button type="button" className="button ghost" onClick={clearSession}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
