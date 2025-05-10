import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 5;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        alert('No se puede eliminar el libro porque está vinculado a un préstamo');
      }
    }
  };

  // Paginación
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="App-header">
      <div className="mb-4">
        <h2>Gestión de Libros</h2>
        <p>Aquí podrás crear, listar y editar libros.</p>
        <button
          onClick={() => navigate('/products/create')}
          className="bg-black text-white px-4 py-2 rounded mb-4"
        >
          Crear Libro
        </button>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 whitespace-nowrap text-sm">ID</th>
                <th className="px-4 py-2 whitespace-nowrap text-sm">Título</th>
                <th className="px-4 py-2 whitespace-nowrap text-sm">Autor</th>
                <th className="px-4 py-2 whitespace-nowrap text-sm">Género</th>
                <th className="px-4 py-2 whitespace-nowrap text-sm">Disponibilidad</th>
                <th className="px-4 py-2 whitespace-nowrap text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-600">
                    <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.títulos}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.autores}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.generos}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.disponibilidad}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-white text-sm">
                      <button
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-white">No hay libros registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;