import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchTopBooks, fetchTopUsers } from '../../api/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF'];

const Cake = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const books = await fetchTopBooks();
      const users = await fetchTopUsers();
      setTopBooks(books);
      setTopUsers(users);
    };
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
      <p>Aquí podrás ver las estadísticas de préstamos en gráficos y exportar reportes.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-semibold mb-2">Libros más prestados</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="total"
                data={topBooks}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ title }) => title}
              >
                {topBooks.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Usuarios que más solicitan préstamos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="total"
                data={topUsers}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.user}
              >
                {topUsers.map((_, index) => (
                  <Cell key={`cell-user-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Cake;