import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLoan, fetchUsers, fetchProducts } from '../../api/api';

const LoanForm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [loanDate, setLoanDate] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const fetchedUsers = await fetchUsers();
      const fetchedProducts = await fetchProducts();
      setUsers(fetchedUsers);
      setProducts(fetchedProducts);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLoan({ user_id: userId, product_id: productId, loan_date: loanDate });
      alert('Préstamo registrado correctamente');
      navigate('/loans');
    } catch (error) {
      alert('Error al registrar el préstamo');
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-200 rounded">
      <h2 className="text-xl mb-6">Crear Préstamo</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-4">
          <label className="block mb-1">Usuario:</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Seleccionar Usuario</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-1">Libro:</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Seleccionar Libro</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.títulos}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-1">Fecha de Préstamo:</label>
          <input
            type="date"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="button-group flex justify-between mt-6">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Registrar Préstamo
          </button>
          <button
            type="button"
            onClick={() => navigate('/loans')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;