import React, { useContext } from "react";
import {
  GlobalStateContext,
  BookResult,
  authorResult,
} from "../../Globalstate";
import BookCard from "../Card/BookCard";

export default function Favorites() {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(GlobalStateContext);

  const isFavorite = (book: BookResult) => {
    return favorites.some((fav) => fav.key === book.key);
  };

  return (
    <div>
      <h1>Favorite Items</h1>
      <ul>
        {favorites.map((item) => (
          <li key={isBookResult(item) ? item.key : (item as authorResult).key}>
            {isBookResult(item) ? (
              <div>
                <div key={item.key} className='p-2 w-full md:w-1/2 lg:w-1/3'>
                  <BookCard
                    book={item}
                    isFavorite={true}
                    onAddToFavorites={addToFavorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>Name: {item.name}</div>
                <div>birth date: {item.birth_date}</div>
                <div>death date: {item.death_date}</div>
                <div>Key: {(item as authorResult).key}</div>
                <div>Top subjects: {item.top_subjects}</div>
                <div>Top Work: {item.top_work}</div>
                <button onClick={() => removeFromFavorites(item)}>
                  Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  // Define a type guard function to check if an item is a BookResult/and accepts objects of type bookresults or authorresults
  function isBookResult(item: BookResult | authorResult): item is BookResult {
    return "title" in item;
  }
}
