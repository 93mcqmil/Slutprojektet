import { ReactNode, createContext, useState } from "react";

// define type for global state
type GlobalState = {
  allBooks: Book[];
  favorites: Book[];
};
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
}

export interface RouterError {
  code: number;
  message: string;
}

// create global state context and we keep track of our books
export const GlobalStateContext = createContext<GlobalState>({
  allBooks: [], // array of books from api
  favorites: [], // array of favorite books
});

//create global state provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  const updateBooks = (newBooks: Book[]) => {
    setBooks(newBooks);
  };

  //create global state provider component
  return (
    <GlobalStateContext.Provider value={{ allBooks: books, favorites: [] }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
