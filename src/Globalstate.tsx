import { Key, ReactNode, SetStateAction, createContext, useState } from "react";
import Books from "./components/Navbar/Books";

// define type for global state
type GlobalState = {
  bookResults: BookResult[];
  favorites: favoriteArray[];
  authorResults: authorResult[];
  updateSearchResultsBooks: (newBooks: BookResult[]) => void; //add the update function here
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
}
export interface BookSearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: BookResult[];
}
/******************************* */
export interface authorResult {
  author_key: number;
  author_name: string;
  // type: ReactNode;
  // top_work: ReactNode;
  // birth_date: ReactNode;
  // key: Key | null | undefined;
  // author_name: string;
  // numfound: number;
  // start: number;
  // numFoundExact: boolean;
  // docs: {
  //   key: string;
  //   name: string;
  //   top_subjects: string[];
  //   top_work: string;
  //   type: string;
  //   work_count: number;
  // }[];
}

// create global state context and we keep track of our books
export const GlobalStateContext = createContext<GlobalState>({
  bookResults: [], // array of books from api
  favorites: [], // array of favorite books
  authorResults: [],
  updateSearchResultsBooks: function (newBooks: BookResult[]): void {
    throw new Error("Function not implemented.");
  },
});

//create global state provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResultsBooks, setsearchResultsBooks] = useState<BookResult[]>(
    []
  );
  const [authorResults, setAuthorsResults] = useState<authorResult[]>([]); // initialize state variable

  const updateSearchResultsBooks = (newBooks: BookResult[]) => {
    setsearchResultsBooks(newBooks);
  };

  //create global state provider component
  return (
    <GlobalStateContext.Provider
      value={{
        bookResults: searchResultsBooks,
        favorites: [],
        authorResults,
        updateSearchResultsBooks,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
