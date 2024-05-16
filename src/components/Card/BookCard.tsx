import React from "react";
import { BookResult } from "../../Globalstate";

interface BookCardProps {
  book: BookResult;
  onAddToFavorites: (item: BookResult) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToFavorites }) => {
  return (
    <a
      href='#'
      className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
    >
      {book.cover_i && (
        <img
          className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
        />
      )}
      <div className='flex flex-col justify-between p-4 flex-1'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {book.title}
        </h5>
        <div>Title: {book.title}</div>
        <div>Author key: {book.author_key}</div>
        <div>Name: {book.author_name}</div>
        <div>Ebook: {book.ebook_access}</div>
        <div>First publish year: {book.first_publish_year}</div>
        <div>First sentence: {book.first_sentence}</div>
        <button
          onClick={() => onAddToFavorites(book)}
          className="'mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'"
        >
          Add to Favorites
        </button>
      </div>
    </a>
  );
};

export default BookCard;
