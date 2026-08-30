import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TailorCategory from './pages/TailorCategory';
import BookTailor from './pages/BookTailor';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tailor" element={<TailorCategory />} />
          <Route path="/tailor/book" element={<BookTailor />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
