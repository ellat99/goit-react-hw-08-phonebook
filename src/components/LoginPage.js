import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../redux/authSlice';

const LoginPage = () => {
  //gestioneaza starea componentei ,folositpt a gestiona valorile de email si parola ale utiliz precum si mesajele de eroare legate de autentificare
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  //hoo de la redux ,este folosit pt a accesa starea de autentificare
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const authError = useSelector(state => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
    setLoginError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (credentials.password.length < 7) {
      setLoginError('Password must be at least 7 characters long.');
      return;
    }
    dispatch(logIn(credentials));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          style={styles.input}
        />
        {loginError && <div style={styles.error}>{loginError}</div>}
      </label>
      {authError && <div style={styles.error}>{authError}</div>}
      <button type="submit" style={styles.button}>
        Login
      </button>
    </form>
  );
};

const styles = {
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '5px',
  },
};

export default LoginPage;
