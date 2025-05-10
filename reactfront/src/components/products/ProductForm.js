import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, deleteProduct, fetchProducts } from '../../api/api';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [títulos, setTitulo] = useState('');
  const [autores, setAutores] = useState('');
  const [generos, setGeneros] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const loadProduct = async () => {
        const products = await fetchProducts();
        const product = products.find((prod) => prod.id === parseInt(id));
        if (product) {
          setTitulo(product.títulos);
          setAutores(product.autores);
          setGeneros(product.generos);
          setDisponibilidad(product.disponibilidad);
        }
      };
      loadProduct();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!títulos.trim()) newErrors.títulos = 'El título es obligatorio';
    if (!autores.trim()) newErrors.autores = 'El autor es obligatorio';
    if (!generos.trim()) newErrors.generos = 'El género es obligatorio';
    if (disponibilidad < 0) newErrors.disponibilidad = 'La disponibilidad no puede ser negativa';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = { títulos, autores, generos, disponibilidad };

      if (isEditing) {
        await updateProduct(id, data);
        alert('Libro actualizado correctamente');
      } else {
        await createProduct(data);
        alert('Libro creado correctamente');
      }

      navigate('/products');
    } catch (error) {
      alert('Error al guardar Libro');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este Libro?')) {
      try {
        await deleteProduct(id);
        alert('Libro eliminado correctamente');
        navigate('/products');
      } catch (error) {
        alert('No se puede eliminar el Libro porque está vinculado a un préstamo');
      }
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-200 rounded">
      <h2 className="text-xl mb-6">{isEditing ? 'Editar Libro' : 'Crear Libro'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block mb-1">Título:</label>
          <input
            type="text"
            value={títulos}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-2 border rounded w-full"
          />
          {errors.títulos && <p className="text-red-500 text-sm">{errors.títulos}</p>}
        </div>

        <div className="mt-4">
          <label className="block mb-1">Autor:</label>
          <input
            type="text"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            className="p-2 border rounded w-full"
          />
          {errors.autores && <p className="text-red-500 text-sm">{errors.autores}</p>}
        </div>

        <div className="mt-4">
          <label className="block mb-1">Género:</label>
          <input
            type="text"
            value={generos}
            onChange={(e) => setGeneros(e.target.value)}
            className="p-2 border rounded w-full"
          />
          {errors.generos && <p className="text-red-500 text-sm">{errors.generos}</p>}
        </div>

        <div className="mt-4">
          <label className="block mb-1">Disponibilidad:</label>
          <input
            type="number"
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(Number(e.target.value))}
            className="p-2 border rounded w-full"
          />
          {errors.disponibilidad && <p className="text-red-500 text-sm">{errors.disponibilidad}</p>}
        </div>

        <div className="button-group mt-6 flex gap-2">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;