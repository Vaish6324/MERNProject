import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/signup/SignupForm";
import LoginForm from "./components/login/LoginForm";
import Welcome from "./components/welcome/Welcome";
import Home from "./components/home/homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
