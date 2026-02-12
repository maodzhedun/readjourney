import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { booksApi } from '@/services/clientApi';
import { BooksFilters, Book, RecommendedBooksResponse } from '@/types';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

// ============ Query Keys Factory ============
export const booksKeys = {
  all: ['books'] as const,
  recommended: (filters?: BooksFilters) =>
    [
      ...booksKeys.all,
      'recommended',
      filters?.page,
      filters?.title,
      filters?.author,
    ] as const,
  library: (status?: string) => [...booksKeys.all, 'library', status] as const,
  detail: (id: string) => [...booksKeys.all, 'detail', id] as const,
};

// ============ Get Recommended Books ============
export function useRecommendedBooks(filters?: BooksFilters) {
  return useQuery({
    queryKey: booksKeys.recommended(filters),
    queryFn: async () => {
      const { data } = await booksApi.getRecommended(filters);
      return data as RecommendedBooksResponse;
    },
    placeholderData: keepPreviousData, // Keeps previous data when paginating
    refetchOnMount: false, // Do not prompt when mounting (for SSR)
  });
}

// ============ Get Own Books (Library) ============
export function useOwnBooks(status?: string) {
  return useQuery({
    queryKey: booksKeys.library(status),
    queryFn: async () => {
      const params = status && status !== 'all' ? { status } : undefined;
      const { data } = await booksApi.getOwnBooks(params);
      return data as Book[];
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}

// ============ Get Book By ID ============
export function useBookById(id: string) {
  return useQuery({
    queryKey: booksKeys.detail(id),
    queryFn: async () => {
      const { data } = await booksApi.getBookById(id);
      return data as Book;
    },
    enabled: !!id,
    refetchOnMount: false,
  });
}

// ============ Add Book to Library ============
export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: {
      title: string;
      author: string;
      totalPages: number;
    }) => {
      const { data } = await booksApi.addBook(book);
      return data as Book;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.library() });
      toast.success('Book added to library!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.error || 'Failed to add book');
    },
  });
}

// ============ Add Book By ID ============
export function useAddBookById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await booksApi.addBookById(id);
      return data as Book;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.library() });
      toast.success('Book added to library!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.error || 'Failed to add book');
    },
  });
}

// ============ Remove Book ============
export function useRemoveBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await booksApi.removeBook(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: booksKeys.library() });
      toast.success('Book removed from library');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.error || 'Failed to remove book');
    },
  });
}
