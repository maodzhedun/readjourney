//components/books/ReccomendedBiiks.tsx

import { Book } from '@/types';
import BookCard from './BookCard';

interface RecommendedBooksProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

export default function RecommendedBooks({
  books,
  onBookClick,
}: RecommendedBooksProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4 md:gap-y-7 2xl:grid-cols-5">
      {books.map((book, index) => (
        <li key={book._id}>
          <BookCard
            book={book}
            onClick={() => onBookClick(book)}
            isPriority={index < 5}
          />
        </li>
      ))}
    </ul>
  );
}
