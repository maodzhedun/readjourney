import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchRecommendedBooks } from '@/services/serverApi';
import { booksKeys } from '@/hooks/useBooks';
import RecommendedClient from './RecommendedClient';

export const metadata: Metadata = {
  title: 'Recommended Books',
  description: 'Discover new books to read based on your interests.',
};

export default async function RecommendedPage() {
  const queryClient = new QueryClient();

  // SSR Prefetch - data is loaded on the server
  await queryClient.prefetchQuery({
    queryKey: booksKeys.recommended({ page: 1, limit: 10 }),
    queryFn: () => fetchRecommendedBooks({ page: 1, limit: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecommendedClient />
    </HydrationBoundary>
  );
}
