import React, { createContext, useEffect, useState } from "react";
import Books from "./components/Navbar/Books";

// define type for global state
export type GlobalState = {
  bookResults: BookResult[];
  favorites: (BookResult | authorResult)[];
  addToFavorites: (item: BookResult | authorResult) => void;
  removeFromFavorites: (key: string) => void;
  authorResults: authorResult[];
  updateSearchResultsBooks: (newBooks: BookResult[]) => void; //add the update function here
  updateSearchResultsAuthors: (newAuthors: authorResult[]) => void;
};

/*********************************** */
export interface RouterError {
  code: number;
  message: string;
}
/********************************* */
export interface BookResult {
  cover_i: number;
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
  bookResults: [], // array of books from api
  favorites: [], // array of favorite books
  authorResults: [],
  updateSearchResultsBooks: () => {},
  updateSearchResultsAuthors: () => {},
  addToFavorites: () => {}, // Dummy function
  removeFromFavorites: () => {}, // Dummy function
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

  useEffect(() => {
    console.log("Favorites changed:", favorites);
  }, [favorites]); // Log favorites whenever it changes

  const value: GlobalState = {
    bookResults,
    favorites,
    authorResults,
    addToFavorites: (item) =>
      setFavorites((prevFavorites) => [...prevFavorites, item]),
    removeFromFavorites: (key) =>
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.key !== key)
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
