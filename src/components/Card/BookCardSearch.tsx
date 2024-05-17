import React, { useState } from "react";
import { BookResult } from "../../Globalstate";

interface BookCardSearchProps {
  book: BookResult;
  onAddToFavorites: (item: BookResult) => void;
}

const BookCardSearch: React.FC<BookCardSearchProps> = ({
  book,
  onAddToFavorites,
}) => {
  const [truncateText, setTruncate] = useState(true);

  const handleAddToFavorites = () => {
    onAddToFavorites(book);
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
          <div>Author key: {book.author_key}</div>
          <div>Name: {book.author_name}</div>
          <div>Ebook: {book.ebook_access}</div>
          <div>First publish year: {book.first_publish_year}</div>
          <div className={truncateText ? "truncate" : ""}>
            First sentence: {book.first_sentence}
          </div>
        </div>
        <button
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
          onClick={handleAddToFavorites}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default BookCardSearch;

// import React, { useState } from "react";
// import { BookResult } from "../../Globalstate";

// interface BookCardProps {
//   book: BookResult;
//   isFavorite: boolean;
//   onAddToFavorites: (item: BookResult) => void;
//   onRemoveFromFavorites: (item: BookResult) => void;
// }

// const BookCardSearch: React.FC<BookCardProps> = ({
//   book,
//   isFavorite,
//   onAddToFavorites,
//   onRemoveFromFavorites,
// }) => {
//   const [truncateText, setTruncate] = useState(true);

//   return (
//     <div
//       className={`flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
//       style={{ cursor: "pointer" }}
//       onClick={() => setTruncate(!truncateText)}
//     >
//       {book.cover_i && (
//         <img
//           className='object-cover w-full rounded-t-lg h-85 md:w-48 md:rounded-none md:rounded-l-lg'
//           src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
//           alt={book.title}
//         />
//       )}
//       <div className='flex flex-col justify-between p-4 overflow-hidden'>
//         <div className='overflow-hidden'>
//           <h5 className='mb-2 text-2x1 font-bold tracking-tight text-gray-900 dark:text-white'>
//             {book.title}
//           </h5>
//           <div>Author key: {book.author_key}</div>
//           <div>Name: {book.author_name}</div>
//           <div>Ebook: {book.ebook_access}</div>
//           <div>First publish year: {book.first_publish_year}</div>
//           <div className={truncateText ? "truncate" : ""}>
//             First sentence: {book.first_sentence}
//           </div>
//         </div>
//         {isFavorite ? (
//           <button
//             className='mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent card click event from toggling truncation
//               onRemoveFromFavorites(book);
//             }}
//           >
//             Remove from Favorites
//           </button>
//         ) : (
//           <button
//             className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent card click event from toggling truncation
//               onAddToFavorites(book);
//             }}
//           >
//             Add to Favorites
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookCardSearch;
