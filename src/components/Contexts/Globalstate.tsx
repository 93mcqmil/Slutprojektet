import React, { createContext, useEffect, useState } from "react";
import { BookResult, authorResult } from "../Interface/Interface";

// define type for global state
export type GlobalState = {
  bookResults: BookResult[];
  favorites: (BookResult | authorResult)[];
  addToFavorites: (item: BookResult | authorResult) => void;
  removeFromFavorites: (item: BookResult | authorResult) => void;
  authorResults: authorResult[];
  updateSearchResultsBooks: (newBooks: BookResult[]) => void; //add the update function here
  updateSearchResultsAuthors: (newAuthors: authorResult[]) => void;
  readBooks: BookResult[];
  addToReadBooks: (item: BookResult) => void;
  removeReadBooks: (item: BookResult) => void;
};

// create global state context to keep track of books
export const GlobalStateContext = createContext<GlobalState>({
  bookResults: [], // Array to store search results for books
  favorites: [], // Array to store search results for authors
  authorResults: [], // Array to store search results authors
  updateSearchResultsBooks: () => {}, // Function to update the book search results
  updateSearchResultsAuthors: () => {}, // Function to update the author search results
  addToFavorites: () => {}, // Function to add an item to favorites
  removeFromFavorites: () => {}, // Function to remove an item from favorites
  readBooks: [], // Array to store all read books
  addToReadBooks: () => {}, // function to add a item to readbooks
  removeReadBooks: () => {}, // function to remove item fom readbooks
});

//create global state provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookResults, setBookResults] = useState<BookResult[]>([]); // state variable for book results
  const [authorResults, setAuthorsResults] = useState<authorResult[]>([]); // state variable for author results

  // update function for book results
  const updateSearchResultsBooks = (newBooks: BookResult[]) => {
    setBookResults(newBooks);
  };
  // update function for author results
  const updateSearchResultsAuthors = (newAuthors: authorResult[]) => {
    setAuthorsResults(newAuthors);
  };
  const [favorites, setFavorites] = useState<(BookResult | authorResult)[]>([]);
  const [readBooks, setReadBooks] = useState<BookResult[]>([]);

  useEffect(() => {}, [favorites, readBooks]); // Log favorites and readBooks whenever it changes

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
