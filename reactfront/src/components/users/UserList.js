import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const USERS_PER_PAGE = 5;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        alert('No se puede eliminar el usuario porque está vinculado a un préstamo');
      }
    }
  };

  // Cálculos de paginación
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <div className="App-header">
      <div className="mb-4">
        <h2>Gestión de Usuarios</h2>
        <p>Aquí podrás crear, listar y editar usuarios.</p>
        <button
          onClick={() => navigate('/users/create')}
          className="bg-black text-white px-4 py-2 rounded mb-4"
        >
          Crear Usuario
        </button>

        <div className="overflow-x-auto bg-transparent shadow-md rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-600">
                    <td className="py-2 px-4 text-white">{user.id}</td>
                    <td className="py-2 px-4 text-white">{user.name}</td>
                    <td className="py-2 px-4 text-white">{user.email}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/users/edit/${user.id}`)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-white">No hay usuarios registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
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

export default UserList;