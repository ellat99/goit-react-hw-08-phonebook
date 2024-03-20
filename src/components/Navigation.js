import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Obtine locatia curenta

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const getLinkClass = path => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>
        <i className="fa-solid fa-address-book"></i> PHONEBOOK
      </h1>
      <div style={styles.links}>
        {isLoggedIn ? (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/register"
              className={`${getLinkClass('/register')} ${styles.link}`}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`${getLinkClass('/register')} ${styles.link}`}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
const styles = {
  nav: {
    backgroundColor: '#15E5C2',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  logo: {
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
    gap: '4rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  'active-link': {
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navigation;
