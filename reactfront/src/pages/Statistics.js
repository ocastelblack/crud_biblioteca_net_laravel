import React, { useState } from 'react';
import Cake from '../components/Statistics/cake';
import LoanReport from '../components/Statistics/LoanReport';

const Statistics = () => {
  const [showReportForm, setShowReportForm] = useState(false); // estado para alternar vistas

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-6">Estadísticas de Préstamos</h1>

      {/* Botones para alternar entre vista de gráficas y formulario */}
      <div className="mb-12 flex justify-between items-center">
        {showReportForm ? (
          <button
            onClick={() => setShowReportForm(false)}
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Volver a Estadísticas
          </button>
        ) : (
          <button
            onClick={() => setShowReportForm(true)}
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Generar Reporte en Excel
          </button>
        )}
      </div>

      {/* Mostrar contenido según la vista actual */}
      <div className="w-full flex justify-center">
        {showReportForm ? (
          <LoanReport onCancel={() => setShowReportForm(false)} />
        ) : (
          <Cake />
        )}
      </div>
    </div>
  );
};

export default Statistics;