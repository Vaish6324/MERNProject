import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/signup/SignupForm";
import LoginForm from "./components/login/LoginForm";
import HomePage from "./components/home/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        
          <Route path="/" element={<SignupForm />} />

          <Route path="/login" element={<LoginForm />} />

          <Route path="/home" element={<HomePage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
