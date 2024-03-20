
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ContactsPage from './ContactsPage';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ContactsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

