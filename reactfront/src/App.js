import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Loans from './pages/Loans';
import Products from './pages/Products';
import ProductForm from "./components/products/ProductForm";
import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="flex justify-center space-x-4 py-4 bg-black bg-opacity-70">
          <Link to="/" className="text-white text-lg py-2 px-4 hover:bg-opacity-90">Inicio</Link>
          <Link to="/users" className="text-white text-lg py-2 px-4 hover:bg-opacity-90">Usuarios</Link>
          <Link to="/products" className="text-white text-lg py-2 px-4 hover:bg-opacity-90">Productos</Link>
          <Link to="/loans" className="text-white text-lg py-2 px-4 hover:bg-opacity-90">Préstamos</Link>
        </nav>

        {/* Contenido */}
        <div className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/loans" element={<Loans />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;