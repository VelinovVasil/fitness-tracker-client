import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';
import Protected from './components/Protected';
import AddRecipe from './components/AddRecipe';
import AddWorkout from './components/AddWorkout';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Protected element={<Dashboard/>} />} />
          <Route path="/add-recipe" element={<Protected element={<AddRecipe/>} />} />
          <Route path="/add-workout" element={<Protected element={<AddWorkout/>} />} />
          <Route path="/recipe/:id" element={<Protected element={<RecipeDetails/>} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
