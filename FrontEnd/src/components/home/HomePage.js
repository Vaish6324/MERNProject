// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const history = useNavigate();

  const navigateToSignup = () => {
    history('/signup'); // Navigate to signup page
  };

  const navigateToLogin = () => {
    history('/login'); // Navigate to login page
  };

  return (
    <div>
      <h1>Welcome To Home Page</h1>
      <div>
        <button onClick={navigateToSignup}>Signup</button>
        <button onClick={navigateToLogin}>Login</button>
      </div>
    </div>
  );
};

export default HomePage;
