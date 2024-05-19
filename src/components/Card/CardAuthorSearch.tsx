import React, { useState } from "react";
import { authorResult } from "../../Globalstate";

interface AuthorCardProps {
  author: authorResult;
  onAddToFavorites: (item: authorResult) => void;
}

const AuthorCardSearch: React.FC<AuthorCardProps> = ({
  author,
  onAddToFavorites,
}) => {
  const [truncateText, setTruncate] = useState(true);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

  const handleAddToFavorites = () => {
    onAddToFavorites(author);
    setIsAddedToFavorites(true);
  };

  return (
    <div
      className='flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
      style={{ cursor: "pointer" }}
      onClick={() => setTruncate(!truncateText)}
    >
      {author.cover_i && (
        <img
          className='object-cover w-full rounded-t-lg h-85 md:w-48 md:rounded-none md:rounded-l-lg'
          src={`https://covers.openlibrary.org/a/olid/${author.cover_i}-L.jpg`}
          alt={author.name}
        />
      )}
      <div className='flex flex-col justify-between p-4 overflow-hidden'>
        <div className='overflow-hidden'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {author.name}
          </h5>
          <div>
            <span className='font-semibold'>Birth date: </span>
            {author.birth_date}
          </div>

          <div>
            <span className='font-semibold'>Death date: </span>
            {author.death_date}
          </div>

          <div className={truncateText ? "truncate" : ""}>
            <span className='font-semibold'>Top subjects: </span>
            {author.top_subjects}
          </div>
          <div>
            <span className='font-semibold'>Top work: </span>
            {author.top_work}
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
      </div>
    </div>
  );
};

export default AuthorCardSearch;
