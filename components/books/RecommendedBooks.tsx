//components/books/RecommendedBooks.tsx

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
    <ul
      className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5"
      style={{ gap: '27px 20px' }}
    >
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
