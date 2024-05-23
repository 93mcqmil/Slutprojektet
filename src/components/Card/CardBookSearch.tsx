import React, { useState } from "react";
import { BookResult } from "../Interface/Interface";

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
  const [isAddedToReadBooks, setIsAddedToReadBooks] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [submittedReview, setSubmittedReview] = useState<string[]>([]);

  const handleAddToFavorites = () => {
    onAddToFavorites(book);
    setIsAddedToFavorites(true);
  };

  const handleAddToReadBooks = () => {
    onAddToReadBooks(book);
    setIsAddedToReadBooks(true);
  };

  const handleReviewSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitReview(book, reviewText);
    setSubmittedReview([...submittedReview, reviewText]);
    setReviewText("");
  };

  return (
    <div
      className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4'
      style={{ maxWidth: "400px", cursor: "pointer" }}
      onClick={() => setTruncate(!truncateText)}
    >
      {book.cover_i && (
        <img
          className='rounded-lg mb-4'
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className='w-full'>
        <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {book.title}
        </h5>
        <p className='text-gray-700 dark:text-gray-400'>
          <span className='font-semibold'>Author key:</span> {book.author_key}
          <br />
          <span className='font-semibold'>Name:</span> {book.author_name}
          <br />
          <span className='font-semibold'>Ebook:</span> {book.ebook_access}
          <br />
          <span className='font-semibold'>First Publish:</span>{" "}
          {book.first_publish_year}
          <br />
          <div className={truncateText ? "truncate max-w-full" : ""}>
            <span className='font-semibold'>First sentence:</span>{" "}
            {book.first_sentence}
          </div>
        </p>
        <div className='flex justify-between mt-4'>
          <div>
            {!isAddedToFavorites ? (
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
                onClick={handleAddToFavorites}
              >
                Add to Favorites
              </button>
            ) : (
              <span className='text-green-500 text-2xl'>✔️</span>
            )}
          </div>
          <div>
            {!isAddedToReadBooks ? (
              <button
                className='ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500'
                onClick={handleAddToReadBooks}
              >
                Add to Read Books
              </button>
            ) : (
              <span className='text-green-500 text-2xl ml-2'>✔️</span>
            )}
          </div>
        </div>
        <form onSubmit={handleReviewSubmit} className='mt-4'>
          <textarea
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Write your review here...'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            type='submit'
            className='mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full'
          >
            Submit
          </button>
        </form>
        <div className='mt-4'>
          {submittedReview.map((review, index) => (
            <div key={index} className='bg-gray-100 p-2 rounded mt-2'>
              {review}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCardSearch;
