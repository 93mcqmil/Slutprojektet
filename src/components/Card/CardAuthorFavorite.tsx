import React, { useState } from "react";
import { authorResult } from "../../Globalstate";

interface AuthorCardFavoritesProps {
  author: authorResult;
  onRemoveFromFavorites: (item: authorResult) => void;
}

const AuthorCardFavorites: React.FC<AuthorCardFavoritesProps> = ({
  author,
  onRemoveFromFavorites,
}) => {
  const [truncateText, setTruncate] = useState(true);

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites(author);
  };

  return (
    <div
      className={`flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
      style={{ cursor: "pointer" }}
      onClick={() => setTruncate(!truncateText)}
    >
      {author.cover_i && (
        <img
          className='object-cover w-full rounded-t-lg h-85 md:w-48 md:rounded-none md:rounded-l-lg'
          src={`https://covers.openlibrary.org/a/olid/${author.cover_i}-M.jpg`}
          alt={author.name}
        />
      )}
      <div className='flex flex-col justify-between p-4 overflow-hidden'>
        <div className='overflow-hidden'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {author.name}
          </h5>
          <div>Birth Date: {author.birth_date}</div>
          <div>Death Date: {author.death_date}</div>
          <div>Top Subjects: {author.top_subjects}</div>
          <div>Top Work: {author.top_work}</div>
          <div className={truncateText ? "truncate" : ""}>
            First sentence: {author.top_work}
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

export default AuthorCardFavorites;
