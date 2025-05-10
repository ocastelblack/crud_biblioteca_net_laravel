import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLoans } from '../../api/api';

const LOANS_PER_PAGE = 5;

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const loadLoans = async () => {
    const data = await fetchLoans();
    setLoans(data);
  };

  useEffect(() => {
    loadLoans();
  }, []);

  const handleCreate = () => {
    navigate('/loans/create');
  };

  const handleReturn = (id) => {
    navigate(`/loans/return/${id}`);
  };

  // Paginación
  const totalPages = Math.ceil(loans.length / LOANS_PER_PAGE);
  const startIndex = (currentPage - 1) * LOANS_PER_PAGE;
  const currentLoans = loans.slice(startIndex, startIndex + LOANS_PER_PAGE);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Gestión de Préstamos</h2>
      <p className="mb-4">Aquí podrás crear préstamos y registrar devoluciones.</p>
      <button
        onClick={handleCreate}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        Crear Préstamo
      </button>

      <div className="overflow-x-auto bg-transparent shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Usuario</th>
              <th className="py-2 px-4">Libro</th>
              <th className="py-2 px-4">Fecha de Préstamo</th>
              <th className="py-2 px-4">Devolución</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentLoans.length > 0 ? (
              currentLoans.map((loan) => (
                <tr key={loan.id} className="border-b">
                  <td className="py-2 px-4">{loan.user_name}</td>
                  <td className="py-2 px-4">{loan.book_title}</td>
                  <td className="py-2 px-4">{loan.loan_date}</td>
                  <td className="py-2 px-4">{loan.return_date || 'Pendiente'}</td>
                  <td className="py-2 px-4">
                    {!loan.return_date && (
                      <button
                        onClick={() => handleReturn(loan.id)}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Registrar Devolución
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No hay préstamos registrados.</td>
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
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanList;