import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />
        <Route
          path="/about"
          element={<About/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/register"
          element={<Register/>}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
