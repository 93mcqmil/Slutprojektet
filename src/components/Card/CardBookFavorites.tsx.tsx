import React, { useState } from "react";
import { BookResult } from "../../Globalstate";

interface BookCardProps {
  book: BookResult;
  onRemoveFromFavorites: (item: BookResult) => void;
}

const BookCardFavorites: React.FC<BookCardProps> = ({
  book,
  onRemoveFromFavorites,
}) => {
  const [truncateText, setTruncate] = useState(true);

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites(book);
  };

  return (
    <div
      className={`flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
      style={{ cursor: "pointer" }}
      onClick={() => setTruncate(!truncateText)}
    >
      {book.cover_i && (
        <img
          className='object-cover w-full rounded-t-lg h-85 md:w-48 md:rounded-none md:rounded-l-lg'
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
        />
      )}
      <div className='flex flex-col justify-between p-4 overflow-hidden'>
        <div className='overflow-hidden'>
          <h5 className='mb-2 text-2x1 font-bold tracking-tight text-gray-900 dark:text-white'>
            {book.title}
          </h5>
          <span className='font-semibold'>Author key: </span>
          {book.author_key}
          <div>
            <span className='font-semibold'>Name: </span>
            {book.author_name}
          </div>
          <div>
            <span className='font-semibold'>Ebook: </span>
            {book.ebook_access}
          </div>
          <div>
            <span className='font-semibold'>First publish: </span>
            {book.first_publish_year}
          </div>
          <div className={truncateText ? "truncate" : ""}>
            <span className='font-semibold'>First sentence: </span>
            {book.author_name}
          </div>
        </div>
        <button
          className='mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
          onClick={handleRemoveFromFavorites}
        >
          Remove from Favorites
        </button>
      </div>
    </div>
  );
};

export default BookCardFavorites;
