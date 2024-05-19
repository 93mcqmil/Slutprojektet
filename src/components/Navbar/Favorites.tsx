// import React, { useContext } from "react";
// import {
//   GlobalStateContext,
//   BookResult,
//   authorResult,
// } from "../../Globalstate";
// import BookCardFavorites from "../Card/CardBookFavorites.tsx";
// import AuthorCardFavorites from "../Card/CardAuthorFavorite.tsx";

// export default function Favorites() {
//   const { favorites, removeFromFavorites } = useContext(GlobalStateContext);

//   return (
//     <div>
//       <h1>Favorite Items</h1>
//       <ul>
//         {favorites.map((item) => (
//           <li key={isBookResult(item) ? item.key : (item as authorResult).key}>
//             {isBookResult(item) ? (
//               <div key={item.key} className='p-2 w-full md:w-1/2 lg:w-1/3'>
//                 <BookCardFavorites
//                   book={item}
//                   onRemoveFromFavorites={removeFromFavorites}
//                 />
//               </div>
//             ) : (
//               <div key={item.key} className='p-2 w-full md:w-1/2 lg:w-1/3'>
//                 <AuthorCardFavorites
//                   author={item}
//                   onRemoveFromFavorites={removeFromFavorites}
//                 />
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   // Define a type guard function to check if an item is a BookResult/and accepts objects of type bookresults or authorresults
//   function isBookResult(item: BookResult | authorResult): item is BookResult {
//     return "title" in item;
//   }
// }

import React, { useContext } from "react";
import {
  GlobalStateContext,
  BookResult,
  authorResult,
} from "../../Globalstate";
import BookCardFavorites from "../Card/CardBookFavorites.tsx";
import AuthorCardFavorites from "../Card/CardAuthorFavorite.tsx";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useContext(GlobalStateContext);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Favorite Items</h1>
      <div className='flex flex-wrap -mx-2'>
        {favorites.map((item) => (
          <div
            key={isBookResult(item) ? item.key : (item as authorResult).key}
            className='p-2 w-full md:w-1/2 lg:w-1/3'
          >
            {isBookResult(item) ? (
              <BookCardFavorites
                book={item}
                onRemoveFromFavorites={removeFromFavorites}
              />
            ) : (
              <AuthorCardFavorites
                author={item}
                onRemoveFromFavorites={removeFromFavorites}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Define a type guard function to check if an item is a BookResult
  function isBookResult(item: BookResult | authorResult): item is BookResult {
    return "title" in item;
  }
}
