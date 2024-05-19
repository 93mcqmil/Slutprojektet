import React, { createContext, useEffect, useState } from "react";

// define type for global state
export type GlobalState = {
  bookResults: BookResult[];
  favorites: (BookResult | authorResult)[];
  addToFavorites: (item: BookResult | authorResult) => void;
  removeFromFavorites: (item: BookResult | authorResult) => void;
  authorResults: authorResult[];
  updateSearchResultsBooks: (newBooks: BookResult[]) => void; //add the update function here
  updateSearchResultsAuthors: (newAuthors: authorResult[]) => void;
};

/********************************* */
export interface BookResult {
  cover_i: string;
  author_name: string;
  key: string;
  title: string;
  author_key: number;
  name: string;
  ebook_access: string;
  first_publish_year: number;
  first_sentence: string;
}
export interface BookSearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: BookResult[];
}
/******************************* */
export interface authorResult {
  cover_i: string;
  name: string;
  birth_date: number;
  death_date: number;
  key: string;
  top_subjects: string;
  top_work: string;
}
export interface authorSearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: authorResult[];
}

// create global state context to keep track of books
export const GlobalStateContext = createContext<GlobalState>({
  bookResults: [], // Array to store search results for books
  favorites: [], // Array to store search results for authors
  authorResults: [], // Array to store favorite books and authors
  updateSearchResultsBooks: () => {}, // Function to update the book search results
  updateSearchResultsAuthors: () => {}, // Function to update the author search results
  addToFavorites: () => {}, // Function to add an item to favorites
  removeFromFavorites: () => {}, // Function to remove an item from favorites
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

  useEffect(() => {}, [favorites]); // Log favorites whenever it changes

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
  };

  // Create global state provider component
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
