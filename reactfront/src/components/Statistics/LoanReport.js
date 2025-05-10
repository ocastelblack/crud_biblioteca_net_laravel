import React, { useState, useEffect } from 'react';
import { downloadLoanReport, fetchUsers, fetchProducts } from '../../api/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoanReport = ({ onCancel }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentBookPage, setCurrentBookPage] = useState(1);
  const itemsPerPage = 10; // 10 items per page

  // Fetch users and books
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);

        const bookList = await fetchProducts();
        setBooks(bookList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);

  // Paginación de usuarios
  const handleUserPageChange = (page) => {
    setCurrentUserPage(page);
  };

  // Paginación de libros
  const handleBookPageChange = (page) => {
    setCurrentBookPage(page);
  };

  // Obtener los usuarios actuales en la página
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const usersToShow = filteredUsers.slice(
    (currentUserPage - 1) * itemsPerPage,
    currentUserPage * itemsPerPage
  );

  // Obtener los libros actuales en la página
  const filteredBooks = books.filter((book) =>
    book.títulos.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const booksToShow = filteredBooks.slice(
    (currentBookPage - 1) * itemsPerPage,
    currentBookPage * itemsPerPage
  );

  const handleDownloadReport = async () => {
    try {
      const fileBlob = await downloadLoanReport(
        selectedUsers.map((user) => user.id),
        selectedBooks.map((book) => book.id),
        dateFrom,
        dateTo
      );
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'loans_report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const handleCancel = () => {
    setSelectedUsers([]);
    setSelectedBooks([]);
    setDateFrom('');
    setDateTo('');
    if (onCancel) onCancel();
  };

  const handleUserSelection = (user) => {
    setSelectedUsers((prevState) => {
      if (prevState.some((u) => u.id === user.id)) {
        return prevState.filter((u) => u.id !== user.id);
      }
      return [...prevState, user];
    });
  };

  const handleBookSelection = (book) => {
    setSelectedBooks((prevState) => {
      if (prevState.some((b) => b.id === book.id)) {
        return prevState.filter((b) => b.id !== book.id);
      }
      return [...prevState, book];
    });
  };

  const handleUserSearchChange = (e) => setUserSearch(e.target.value);
  const handleBookSearchChange = (e) => setBookSearch(e.target.value);

  const handleUserModalClose = () => setShowUserModal(false);
  const handleBookModalClose = () => setShowBookModal(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generar Reporte de Préstamos</h2>
      <p>Filtra por los siguientes parámetros para generar el reporte:</p>

      {/* Formulario con campos debajo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Selecciona los Usuarios</label>
        <Button
          variant="primary"
          onClick={() => setShowUserModal(true)}
        >
          Seleccionar Usuarios
        </Button>
        <div className="mt-2">
          {selectedUsers.map((user) => (
            <span key={user.id} className="inline-block mr-2 text-sm bg-gray-200 px-2 py-1 rounded">
              {user.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Selecciona los Libros</label>
        <Button
          variant="primary"
          onClick={() => setShowBookModal(true)}
        >
          Seleccionar Libros
        </Button>
        <div className="mt-2">
          {selectedBooks.map((book) => (
            <span key={book.id} className="inline-block mr-2 text-sm bg-gray-200 px-2 py-1 rounded">
              {book.títulos}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="date_from" className="block text-sm font-medium text-gray-700">Fecha Desde</label>
        <input
          type="date"
          id="date_from"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date_to" className="block text-sm font-medium text-gray-700">Fecha Hasta</label>
        <input
          type="date"
          id="date_to"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownloadReport}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Descargar Reporte
        </button>

        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>

      {/* Modal de selección de usuarios */}
      <Modal show={showUserModal} onHide={handleUserModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={userSearch}
            onChange={handleUserSearchChange}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <Container>
            <Row>
              {usersToShow.map((user) => (
                <Col key={user.id} xs={12} md={6}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`user_${user.id}`}
                      value={user.id}
                      onChange={() => handleUserSelection(user)}
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`user_${user.id}`} className="text-sm">{user.name}</label>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Paginación */}
          <div className="flex justify-center mt-4">
            <Button
              variant="secondary"
              onClick={() => handleUserPageChange(currentUserPage - 1)}
              disabled={currentUserPage === 1}
            >
              Anterior
            </Button>
            <span className="mx-2">{`Página ${currentUserPage}`}</span>
            <Button
              variant="secondary"
              onClick={() => handleUserPageChange(currentUserPage + 1)}
              disabled={currentUserPage * itemsPerPage >= filteredUsers.length}
            >
              Siguiente
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUserModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de selección de libros */}
      <Modal show={showBookModal} onHide={handleBookModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Libros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={bookSearch}
            onChange={handleBookSearchChange}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <Container>
            <Row>
              {booksToShow.map((book) => (
                <Col key={book.id} xs={12} md={6}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`book_${book.id}`}
                      value={book.id}
                      onChange={() => handleBookSelection(book)}
                      checked={selectedBooks.some((b) => b.id === book.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`book_${book.id}`} className="text-sm">{book.títulos}</label>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Paginación */}
          <div className="flex justify-center mt-4">
            <Button
              variant="secondary"
              onClick={() => handleBookPageChange(currentBookPage - 1)}
              disabled={currentBookPage === 1}
            >
              Anterior
            </Button>
            <span className="mx-2">{`Página ${currentBookPage}`}</span>
            <Button
              variant="secondary"
              onClick={() => handleBookPageChange(currentBookPage + 1)}
              disabled={currentBookPage * itemsPerPage >= filteredBooks.length}
            >
              Siguiente
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBookModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoanReport;