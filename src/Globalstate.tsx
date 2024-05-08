import { Key, ReactNode, SetStateAction, createContext, useState } from "react";
import Books from "./components/Navbar/Books";

// define type for global state
type GlobalState = {
  bookResults: bookResult[];
  favorites: favoriteArray[];
  authorResults: authorResult[];
};
/*********************************** */
export interface RouterError {
  code: number;
  message: string;
}
/********************************* */
export interface bookResult {
  key: string;
  docs: SetStateAction<bookResult[] | null>;
  id: string;
  title: string;
  cover_i: number;
  author_name: string;
  genre: string;
}
/******************************* */
export interface authorResult {
  key: Key | null | undefined;
  name: ReactNode;
  numfound: number;
  start: number;
  numFoundExact: boolean;
  docs: {
    key: string;
    name: string;
    top_subjects: string[];
    top_work: string;
    type: string;
    work_count: number;
    _version_: number;
  }[];
}

// create global state context and we keep track of our books
export const GlobalStateContext = createContext<GlobalState>({
  bookResults: [], // array of books from api
  favorites: [], // array of favorite books
  authorResults: [], // saves the fetched data from author api
});

//create global state provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResultsBooks, setsearchResultsBooks] = useState<bookResult[]>(
    []
  );
  const [authorResults, setAuthorsResults] = useState<authorResult[]>([]); // initialize state variable

  const updateBooks = (newBooks: bookResult[]) => {
    setsearchResultsBooks(newBooks);
  };

  //create global state provider component
  return (
    <GlobalStateContext.Provider
      value={{ bookResults: [], favorites: [], authorResults }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
