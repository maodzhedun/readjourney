import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { readingApi } from '@/services/clientApi';
import { booksKeys } from './useBooks';
import { Book, StartReadingPayload, FinishReadingPayload } from '@/types';

// ============ Start Reading ============
export function useStartReading() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: StartReadingPayload) => {
      const { data } = await readingApi.startReading(payload);
      return data as Book;
    },
    onSuccess: (data, variables) => {
      // We update the cache directly for faster UX
      queryClient.setQueryData(booksKeys.detail(variables.id), data);
      toast.success('Reading started!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to start reading');
    },
  });
}

// ============ Finish Reading ============
export function useFinishReading() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: FinishReadingPayload) => {
      const { data } = await readingApi.finishReading(payload);
      return data as Book;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(booksKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: booksKeys.library() });
      toast.success('Reading progress saved!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to save progress');
    },
  });
}

// ============ Delete Reading Entry ============
export function useDeleteReading() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      readingId,
    }: {
      bookId: string;
      readingId: string;
    }) => {
      await readingApi.deleteReading(bookId, readingId);
      return { bookId, readingId };
    },
    onSuccess: ({ bookId }) => {
      queryClient.invalidateQueries({ queryKey: booksKeys.detail(bookId) });
      toast.success('Reading entry deleted');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete entry');
    },
  });
}
