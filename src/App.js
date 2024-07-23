import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import { AuthProvider } from './components/AuthContext';
import AddRecipe from './components/AddRecipe';
import AddWorkout from './components/AddWorkout';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from "./components/EditRecipe";
import WorkoutDetails from './components/WorkoutDetails';
import EditWorkout from './components/EditWorkout';
import AdminPanel from "./components/AdminPanel";
import './i18n';
import { useTranslation } from "react-i18next";
import AddExercise from "./components/AddExercise";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, [i18n]);

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
          <Route path="/edit-recipe/:id" element={<Protected element={<EditRecipe/>} />} />
          <Route path="/workout/:id" element={<Protected element={<WorkoutDetails/>} />} />
          <Route path="/edit-workout/:id" element={<Protected element={<EditWorkout/>} />} />
          <Route path="/admin" element={<Protected element={<AdminPanel/>} requiredRole="ADMIN" />} />
          <Route path="/add-exercise" element={<Protected element={<AddExercise/>} requiredRole="ADMIN" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
