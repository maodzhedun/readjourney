'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useRecommendedBooks } from '@/hooks/useBooks';
import Loader from '@/components/ui/Loader';

export default function RecommendedPreview() {
  const { data, isLoading } = useRecommendedBooks({ limit: 3 });

  const previewBooks = data?.results.slice(0, 3) || [];

  return (
    <div className="rounded-xl bg-[#262626]" style={{ padding: '20px' }}>
      <h3
        className="font-bold text-[#f9f9f9]"
        style={{ fontSize: '18px', marginBottom: '14px', lineHeight: '1.1' }}
      >
        Recommended books
      </h3>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="sm" />
        </div>
      ) : (
        <ul className="flex" style={{ gap: '20px' }}>
          {previewBooks.map((book, index) => (
            <li key={book._id} style={{ width: '71px' }}>
              <div
                className="relative overflow-hidden rounded-lg bg-[#3e3e3e]"
                style={{ width: '71px', height: '107px', marginBottom: '8px' }}
              >
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  sizes="71px"
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
              <h4
                className="truncate font-bold text-[#f9f9f9]"
                style={{ fontSize: '10px', marginBottom: '2px' }}
              >
                {book.title}
              </h4>
              <p
                className="truncate text-[#686868]"
                style={{ fontSize: '10px' }}
              >
                {book.author}
              </p>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/recommended"
        className="group flex items-center gap-1 text-[#686868] underline transition-colors hover:text-[#f9f9f9]"
        style={{ marginTop: '20px', fontSize: '14px' }}
      >
        Home
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          className="stroke-[#686868] transition-colors group-hover:stroke-[#f9f9f9]"
          fill="none"
        >
          <use href="/sprite.svg#icon-arrow-right" />
        </svg>
      </Link>
    </div>
  );
}
