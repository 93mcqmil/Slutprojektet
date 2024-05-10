import React, { createContext, useState } from "react";
import Books from "./components/Navbar/Books";

// define type for global state
export type GlobalState = {
  bookResults: BookResult[];
  favorites: favoriteArray[];
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
  key: string;
  author_key: string;
  author_name: string;
  title: string;
  ebook_access: string;
  first_publish_year: number;
}
export interface BookSearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: BookResult[];
}
/******************************* */
export interface authorResult {
  type: string;
  top_work: string;
  key: string;
  birth_date: number;
  author_key: number;
  author_name: string;
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

  const value: GlobalState = {
    bookResults,
    favorites: [],
    authorResults,
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
