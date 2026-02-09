//app/(private)/library/page.tsx

import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchOwnBooks } from '@/services/serverApi';
import { booksKeys } from '@/hooks/useBooks';
import LibraryClient from './LibraryClient';

export const metadata: Metadata = {
  title: 'My Library',
  description: 'View and manage your personal book collection.',
};

export default async function LibraryPage() {
  const queryClient = new QueryClient();

  // SSR Prefetch
  await queryClient.prefetchQuery({
    queryKey: booksKeys.library('all'),
    queryFn: () => fetchOwnBooks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryClient />
    </HydrationBoundary>
  );
}
