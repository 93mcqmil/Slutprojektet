import React, { createContext, useEffect, useState } from "react";
import { BookResult, authorResult } from "../Interface/Interface";

// define type for global state
export type GlobalState = {
  bookResults: BookResult[];
  favorites: (BookResult | authorResult)[];
  addToFavorites: (item: BookResult | authorResult) => void;
  removeFromFavorites: (item: BookResult | authorResult) => void;
  authorResults: authorResult[];
  updateSearchResultsBooks: (newBooks: BookResult[]) => void;
  updateSearchResultsAuthors: (newAuthors: authorResult[]) => void;
  readBooks: BookResult[];
  addToReadBooks: (item: BookResult) => void;
  removeReadBooks: (item: BookResult) => void;
};

// create global state context to keep track of books
export const GlobalStateContext = createContext<GlobalState>({
  bookResults: [], // Array to store search results for books
  favorites: [],
  authorResults: [],
  updateSearchResultsBooks: () => {},
  updateSearchResultsAuthors: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  readBooks: [],
  addToReadBooks: () => {},
  removeReadBooks: () => {},
});

//create global state provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookResults, setBookResults] = useState<BookResult[]>([]);
  const [authorResults, setAuthorsResults] = useState<authorResult[]>([]);
  const [favorites, setFavorites] = useState<(BookResult | authorResult)[]>([]);
  const [readBooks, setReadBooks] = useState<BookResult[]>([]);

  // update function for book results
  const updateSearchResultsBooks = (newBooks: BookResult[]) => {
    setBookResults(newBooks);
  };
  // update function for author results
  const updateSearchResultsAuthors = (newAuthors: authorResult[]) => {
    setAuthorsResults(newAuthors);
  };

  useEffect(() => {}, [favorites, readBooks]); // Left it for debugging purposes

  const value: GlobalState = {
    bookResults,
    favorites,
    authorResults,
    addToFavorites: (item) =>
      setFavorites((prevFavorites) => [...prevFavorites, item]),
    removeFromFavorites: (itemToRemove) =>
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item !== itemToRemove)
      ),
    updateSearchResultsBooks,
    updateSearchResultsAuthors,
    readBooks,
    addToReadBooks: (item) =>
      setReadBooks((prevReadBooks) => [...prevReadBooks, item]),
    removeReadBooks: (itemToRemove) =>
      setReadBooks((prevReadBooks) =>
        prevReadBooks.filter((item) => item !== itemToRemove)
      ),
  };

  // Create global state provider component
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
