import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Usuarios
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createUser = async (data) => {
  try {
    const response = await api.post("/user", data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Productos
export const fetchProducts = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const createProduct = async (data) => {
  try {
    const response = await api.post('/books', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/book/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/book/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Préstamos
export const fetchLoans = async () => {
  try {
    const response = await api.get('/loans');
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    return [];
  }
};

export const createLoan = async (data) => {
  try {
    const response = await api.post('/loan', data);
    return response.data;
  } catch (error) {
    console.error('Error creating loan:', error);
    throw error;
  }
};

export const returnLoan = async (loanId) => {
  try {
    const response = await api.post(`/loans/${loanId}/return`);
    return response.data;
  } catch (error) {
    console.error('Error returning loan:', error);
    throw error;
  }
};

export const fetchTopBooks = async () => {
  try {
    const response = await api.get('/loans/top-books');
    return response.data;
  } catch (error) {
    console.error('Error fetching top books:', error);
    return [];
  }
};

export const fetchTopUsers = async () => {
  try {
    const response = await api.get('/top-users');
    return response.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
};

export const downloadLoanReport = async (userId, bookId, dateFrom, dateTo) => {
  try {
    const response = await api.get('/loans/export', {
      params: {
        user_id: userId,
        book_id: bookId,
        date_from: dateFrom,
        date_to: dateTo,
      },
      responseType: 'blob', // Esto es necesario para manejar archivos binarios
    });
    return response.data; // Regresa el archivo excel como Blob
  } catch (error) {
    console.error('Error downloading loan report:', error);
    throw error;
  }
};