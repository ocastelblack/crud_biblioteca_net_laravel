import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Loans from './components/loans/LoanList';
import LoanForm from './components/loans/LoanForm';
import LoanReturnForm from './components/loans/LoanReturnForm';
import ProductList from './components/products/ProductList';
import ProductForm from "./components/products/ProductForm";
import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';
import Statistics from './pages/Statistics';

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
          <Link to="/statistics" className="text-white text-lg py-2 px-4 hover:bg-opacity-90">Estadísticas</Link>
        </nav>

        {/* Contenido */}
        <div className="App-header">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            {/* Usuarios */}
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            {/* Productos */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
             {/* Préstamos */}
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/create" element={<LoanForm />} />
            <Route path="/loans/return/:id" element={<LoanReturnForm />} />
            {/* Estadisticas */}
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;