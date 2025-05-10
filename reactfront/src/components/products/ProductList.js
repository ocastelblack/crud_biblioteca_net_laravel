import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../api/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
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

      <div className="overflow-x-auto bg-transparent shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Título</th>
              <th className="py-2 px-4">Autor</th>
              <th className="py-2 px-4">Género</th>
              <th className="py-2 px-4">Disponibilidad</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">{product.títulos}</td>
                  <td className="py-2 px-4">{product.autores}</td>
                  <td className="py-2 px-4">{product.generos}</td>
                  <td className="py-2 px-4">{product.disponibilidad}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
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
                <td colSpan="6" className="text-center py-4">No hay libros registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;