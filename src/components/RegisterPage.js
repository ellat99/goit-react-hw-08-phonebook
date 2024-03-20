import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/authSlice';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts'); 
    }
  }, [isLoggedIn, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }));
    if (name === 'password') {
      if (value.length < 7 && value.length > 0) {
        setPasswordError('Password must be at least 7 characters long.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userData.password.length < 7) {
      setPasswordError('Password must be at least 7 characters long.');
      return; 
    }
    dispatch(register(userData));
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
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
          value={userData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.errorMessage}>{passwordError}</div>
      </label>
      <button type="submit" style={styles.submitButton}>
        Register
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginTop: '5px',
  },
};

export default RegisterPage;
