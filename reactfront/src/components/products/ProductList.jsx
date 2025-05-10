import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../api/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = () => {
    navigate('/products/create');
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este Libro?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        alert('No se puede eliminar el Libro porque está vinculado a un préstamo');
      }
    }
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-4">
      <h2>Gestión de Libros</h2>
      <p>Aquí podrás crear, listar y editar libros.</p>
      <button
        onClick={handleCreate}
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
            {currentItems.map((product) => (
                <tr key={product.id} className="border-b border-gray-600">
                <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.títulos}</td>
                <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.autores}</td>
                <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.generos}</td>
                <td className="px-4 py-2 whitespace-nowrap text-white text-sm">{product.disponibilidad}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                    {/* Botones */}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>


      {/* Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-black text-white'
                : 'bg-gray-300 text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;