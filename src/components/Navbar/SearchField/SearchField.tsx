// import { ChangeEvent, useState } from "react";
// import axios from "axios";
// import { bookResult, authorResult } from "../../../Globalstate";

// export default function SearchField() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResultsAuthors, setSearchResultsAuthors] = useState<
//     authorResult[] | null
//   >(null);
//   const [searchResultsBooks, setSearchResultsBooks] = useState<
//     bookResult[] | null
//   >(null);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (searchTerm.trim() === "") {
//       // Empty search term, do nothing
//       return;
//     }

//     const lowercaseSearchTerm = searchTerm.toLowerCase(); // convert to lowercase

//     try {
//       setLoading(true);

//       const responseAuthors = await axios.get<authorResult>(
//         `https://openlibrary.org/search/authors.json?q=${lowercaseSearchTerm}&limit=1`
//       );

//       setSearchResultsAuthors(responseAuthors.data.docs);

//       const responseBooks = await axios.get<bookResult>(
//         `https://openlibrary.org/search.json?title=${lowercaseSearchTerm}&limit=1`
//       );
//       setSearchResultsBooks(responseBooks.data.docs);
//       console.log("Book Data: ", responseBooks.data.docs);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setSearchResultsAuthors([]);
//       setSearchResultsBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <label htmlFor='site-search'>Search the site:</label>
//       <input
//         type='search'
//         id='site-search'
//         name='q'
//         value={searchTerm}
//         onChange={handleChange}
//       />

//       <button onClick={handleSearch}>Search</button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {searchResultsAuthors && searchResultsAuthors.length > 0 && (
//             <div>
//               <h2>Authors</h2>
//               <ul>
//                 {searchResultsAuthors.map((author) => (
//                   <li key={author.key}>
//                     <div>Name: {author.name}</div>
//                     <div>Birth Date: {author.birth_date}</div>
//                     <div>Top Work: {author.top_work}</div>
//                     <div>Type: {author.type}</div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {searchResultsBooks && searchResultsBooks.length > 0 && (
//             <div>
//               <h2>Books</h2>
//               <ul>
//                 {searchResultsBooks.map((book) => (
//                   <li key={book.key}>{book.title}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// }
import React, { ChangeEvent, useState } from "react";
import { useDataFetching } from "../../../hooks/useDataFetching"; // Assuming useDataFetching is in a separate file
import { authorResult, BookResult } from "../../../Globalstate";

export default function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Using the custom hook to fetch data for authors and books
  const searchResultsAuthors = useDataFetching<authorResult[] | null>(
    searchTerm
      ? `https://openlibrary.org/search/authors.json?q=${searchTerm}&limit=5`
      : ""
  );
  const searchResultsBooks = useDataFetching<BookResult[] | null>(
    searchTerm
      ? `https://openlibrary.org/search.json?title=${searchTerm}&limit=5`
      : ""
  );
  console.log("Authors Data: ", searchResultsAuthors.data);
  console.log("Books Data: ", searchResultsBooks.data);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    setLoading(true);
    // No need for manual fetching here, handled by useDataFetching hook
    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <label htmlFor='site-search'>Search the site:</label>
      <input
        type='search'
        id='site-search'
        name='q'
        value={searchTerm}
        onChange={handleChange}
      />

      <button onClick={handleSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchResultsAuthors &&
            Array.isArray(searchResultsAuthors) &&
            searchResultsAuthors.length > 0 && (
              <div>
                <h2>Authors</h2>
                <ul>
                  {searchResultsAuthors.map((author: any) => (
                    <li key={author.key}>
                      <div>Name: {author.name}</div>
                      <div>Birth Date: {author.birth_date}</div>
                      <div>Top Work: {author.top_work}</div>
                      <div>Type: {author.type}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {searchResultsBooks &&
            searchResultsBooks.data &&
            searchResultsBooks.data.docs && (
              <div>
                <h2>Books</h2>
                <ul>
                  {searchResultsBooks.data.docs.map((book: BookResult) => (
                    <li key={book.key}>
                      <div>Title: {book.title}</div>
                      <div>Author key: {book.author_key}</div>
                      <div>Name: {book.author_name}</div>
                      <div>Ebook: {book.ebook_access}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </>
      )}
    </>
  );
}
