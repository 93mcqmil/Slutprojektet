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

// define type for global state

export interface GlobalState {
  allBooks: Book[]; // array of books
  favorites: Book[]; // array of favorite books
}
