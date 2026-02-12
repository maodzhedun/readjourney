//components/books/MyLibraryBooks.tsx;

import { Book } from '@/types';
import MyBook from './MyBook';

interface MyLibraryBooksProps {
  books: Book[];
  onRemove: (id: string) => void;
  onStartReading: (book: Book) => void;
  isRemoving?: boolean;
}

export default function MyLibraryBooks({
  books,
  onRemove,
  onStartReading,
  isRemoving,
}: MyLibraryBooksProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-6 2xl:grid-cols-5 lg:grid-cols-5">
      {books.map((book, index) => (
        <li key={book._id}>
          <MyBook
            book={book}
            onRemove={() => onRemove(book._id)}
            onStartReading={() => onStartReading(book)}
            isRemoving={isRemoving}
            isPriority={index < 5}
          />
        </li>
      ))}
    </ul>
  );
}