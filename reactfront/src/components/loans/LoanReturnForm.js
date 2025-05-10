import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { returnLoan, fetchLoans } from '../../api/api';

const LoanReturnForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    const loadLoan = async () => {
      try {
        const loans = await fetchLoans();
        const selectedLoan = loans.find((loan) => loan.id === parseInt(id) && !loan.return_date);
        if (selectedLoan) {
          setLoan(selectedLoan);
        } else {
          alert('No se encontró el préstamo o ya fue devuelto');
          navigate('/loans');
        }
      } catch (error) {
        console.error('Error cargando el préstamo:', error);
      }
    };
    loadLoan();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await returnLoan(id);
      alert('Devolución registrada correctamente');
      navigate('/loans');
    } catch (error) {
      alert('Error al registrar la devolución');
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-200 rounded">
      <h2 className="text-xl mb-6">Registrar Devolución</h2>

      {loan ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-4">
            <p><strong>Usuario:</strong> {loan.user_name}</p>
            <p><strong>Libro:</strong> {loan.book_title}</p>
            <p><strong>Fecha de Préstamo:</strong> {loan.loan_date}</p>
          </div>

          <div className="mt-4">
            <label className="block mb-1">Fecha de Devolución:</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="button-group flex justify-between mt-6">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
              Registrar Devolución
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
      ) : (
        <p className="text-center">Cargando información del préstamo...</p>
      )}
    </div>
  );
};

export default LoanReturnForm;