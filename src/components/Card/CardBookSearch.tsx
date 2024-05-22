import React, { useState } from "react";
import { BookResult } from "../Interface/Interface";
//interface to include functions
interface BookCardSearchProps {
  book: BookResult;
  onAddToFavorites: (item: BookResult) => void;
  onAddToReadBooks: (item: BookResult) => void;
  onSubmitReview: (book: BookResult, review: string) => void;
}

const BookCardSearch: React.FC<BookCardSearchProps> = ({
  book,
  onAddToFavorites,
  onAddToReadBooks,
  onSubmitReview,
}) => {
  const [truncateText, setTruncate] = useState(true);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const [isAddedtoReadBooks, setIsAdded] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleAddToFavorites = () => {
    onAddToFavorites(book);
    setIsAddedToFavorites(true);
  };
  const handleAddToReadBooks = () => {
    onAddToReadBooks(book);
    setIsAdded(true);
  };
  const handleReviewSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitReview(book, reviewText);
    setReviewText("");
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
          <div>
            <span className='font-semibold'>Author key:</span> {book.author_key}
          </div>
          <div>
            <span className='font-semibold'>Name: </span>
            {book.author_name}
          </div>
          <div>
            <span className='font-semibold'>Ebook: </span>
            {book.ebook_access}
          </div>
          <div>
            <span className='font-semibold'>First Publish: </span>
            {book.first_publish_year}
          </div>
          <div className={truncateText ? "truncate" : ""}>
            <span className='font-semibold'>First sentence: </span>
            {book.first_sentence}
          </div>
        </div>
        {!isAddedToFavorites ? (
          <button
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
            onClick={handleAddToFavorites}
          >
            Add to Favorites
          </button>
        ) : (
          <span className='text-green-500 text-2xl'>✔️</span>
        )}
        Add to read book:
        {!isAddedtoReadBooks ? (
          <button className='border: ' onClick={handleAddToReadBooks}>
            +
          </button>
        ) : (
          <span className='text-green-500 text-2xl'>✔️</span>
        )}
      </div>
      {/* <form onSubmit={handleReviewSubmit} className='mt-4'>
        <textarea
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='Write your review here...'
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button
          type='submit'
          className='mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700'
        >
          Submit
        </button>
      </form> */}
    </div>
  );
};

export default BookCardSearch;
