import axios from 'axios';

// For client component - requests by Next.js API Routes
const clientApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default clientApi;

// ============ Auth API ============
export const authApi = {
  register: (credentials: { name: string; email: string; password: string }) =>
    clientApi.post('/auth/register', credentials),

  login: (credentials: { email: string; password: string }) =>
    clientApi.post('/auth/login', credentials),

  logout: () => clientApi.post('/auth/logout'),

  getSession: () => clientApi.get('/auth/session'),

  getCurrentUser: () => clientApi.get('/users/me'),
};

// ============ Books API ============
export const booksApi = {
  getRecommended: (params?: {
    title?: string;
    author?: string;
    page?: number;
    limit?: number;
  }) => clientApi.get('/books/recommend', { params }),

  addBook: (book: { title: string; author: string; totalPages: number }) =>
    clientApi.post('/books/add', book),

  addBookById: (id: string) => clientApi.post(`/books/add/${id}`),

  removeBook: (id: string) => clientApi.delete(`/books/${id}`),

  getOwnBooks: (params?: { status?: string }) =>
    clientApi.get('/books/own', { params }),

  getBookById: (id: string) => clientApi.get(`/books/${id}`),
};

// ============ Reading API ============
export const readingApi = {
  startReading: (data: { id: string; page: number }) =>
    clientApi.post('/books/reading/start', data),

  finishReading: (data: { id: string; page: number }) =>
    clientApi.post('/books/reading/finish', data),

  deleteReading: (bookId: string, readingId: string) =>
    clientApi.delete(`/books/reading?bookId=${bookId}&readingId=${readingId}`),
};
