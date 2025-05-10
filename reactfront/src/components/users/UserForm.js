import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, deleteUser, fetchUsers } from '../../api/api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const loadUser = async () => {
        const users = await fetchUsers();
        const user = users.find((user) => user.id === parseInt(id));
        if (user) {
          setName(user.name);
          setEmail(user.email);
        }
      };
      loadUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(id, { name, email });
        alert('Usuario actualizado correctamente');
      } else {
        await createUser({ name, email, password });
        alert('Usuario creado correctamente');
      }
      navigate('/users');
    } catch (error) {
      alert('Error al guardar usuario');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      try {
        await deleteUser(id);
        alert('Usuario eliminado correctamente');
        navigate('/users');
      } catch (error) {
        alert('No se puede eliminar el usuario porque está vinculado a un préstamo');
      }
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-200 rounded">
    <h2 className="text-xl mb-2">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
        />
        </div>
        <div className="mb-2">
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full"
        />
        </div>
        {!isEditing && (
        <div className="mb-2">
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full"
            />
        </div>
        )}
        <div className="flex justify-between mt-4">
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            {isEditing ? 'Actualizar' : 'Crear'}
        </button>
        <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-black text-white px-4 py-2 rounded"
        >
            Cancelar
        </button>
        {isEditing && (
            <button
            type="button"
            onClick={handleDelete}
            className="bg-black text-white px-4 py-2 rounded"
            >
            Eliminar
            </button>
        )}
        </div>
    </form>
    </div>

  );
};

export default UserForm;