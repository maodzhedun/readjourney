'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { useRecommendedBooks } from '@/hooks/useBooks';
import Loader from '@/components/ui/Loader';

export default function RecommendedPreview() {
  const { data, isLoading } = useRecommendedBooks({ limit: 3 });

  const previewBooks = data?.results.slice(0, 3) || [];

  return (
    <div className="rounded-xl bg-[#262626] p-5">
      <h3 className="mb-4 text-lg font-bold text-[#f9f9f9]">
        Recommended books
      </h3>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="sm" />
        </div>
      ) : (
        <ul className="flex gap-5">
          {previewBooks.map((book, index) => (
            <li key={book._id} className="w-[71px]">
              <div className="relative mb-2 h-[107px] w-[71px] overflow-hidden rounded-lg bg-[#3e3e3e]">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  sizes="71px"
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
              <h4 className="truncate text-xs font-bold text-[#f9f9f9]">
                {book.title}
              </h4>
              <p className="truncate text-[10px] text-[#686868]">
                {book.author}
              </p>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/recommended"
        className="mt-4 flex items-center gap-1 text-sm text-[#686868] underline transition-colors hover:text-[#f9f9f9]"
      >
        Home
        <ArrowRight size={20} />
      </Link>
    </div>
  );
}
