//app/(private)/reading/page.tsx

import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchBookById } from '@/services/serverApi';
import { booksKeys } from '@/hooks/useBooks';
import ReadingClient from './ReadingClient';

type Props = {
  searchParams: Promise<{ bookId?: string }>;
};

export const metadata: Metadata = {
  title: 'Reading',
  description:
    'Track your current reading progress. Start and stop reading sessions, view statistics and diary.',
  openGraph: {
    title: 'Reading Progress | Read Journey',
    description: 'Track your current reading progress.',
  },
};

export default async function ReadingPage({ searchParams }: Props) {
  const { bookId } = await searchParams;
  const queryClient = new QueryClient();

  // SSR Prefetch if bookId exists
  if (bookId) {
    await queryClient.prefetchQuery({
      queryKey: booksKeys.detail(bookId),
      queryFn: () => fetchBookById(bookId),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReadingClient bookId={bookId} />
    </HydrationBoundary>
  );
}
