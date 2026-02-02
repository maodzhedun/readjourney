// API for Server Components with cookie support
import { cookies } from 'next/headers';
import { api } from './api';
import { Book, RecommendedBooksResponse, BooksFilters } from '@/types';

// Helper for getting a token from cookies
async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ============ Books Server API ============
export async function fetchRecommendedBooks(
  filters?: BooksFilters
): Promise<RecommendedBooksResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/books/recommend', {
    params: filters,
    headers,
  });
  return data;
}

export async function fetchOwnBooks(status?: string): Promise<Book[]> {
  const headers = await getAuthHeaders();
  const params = status && status !== 'all' ? { status } : undefined;
  const { data } = await api.get('/books/own', { params, headers });
  return data;
}

export async function fetchBookById(id: string): Promise<Book> {
  const headers = await getAuthHeaders();
  const { data } = await api.get(`/books/${id}`, { headers });
  return data;
}
