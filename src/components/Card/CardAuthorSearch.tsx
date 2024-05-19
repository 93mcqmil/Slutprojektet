import React from "react";
import { authorResult } from "../../Globalstate";

interface AuthorCardProps {
  author: authorResult;
  onAddToFavorites: (item: authorResult) => void;
}

const AuthorCardSearch: React.FC<AuthorCardProps> = ({
  author,
  onAddToFavorites,
}) => {
  const handleAddToFavorites = () => {
    onAddToFavorites(author);
  };

  return (
    <div className='flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4'>
      {author.cover_i && (
        <img
          className='object-cover w-full rounded-t-lg h-85 md:w-48 md:rounded-none md:rounded-l-lg'
          src={`http://covers.openlibrary.org/b/id/${author.cover_i}-M.jpg`}
          alt={author.name}
        />
      )}
      <div className='flex flex-col justify-between p-4'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {author.name}
        </h5>
        <div>Birth Date: {author.birth_date}</div>
        <div>Death Date: {author.death_date}</div>
        <div>Top Subjects: {author.top_subjects}</div>
        <div>Top Work: {author.top_work}</div>
        <button
          className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={handleAddToFavorites}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default AuthorCardSearch;
