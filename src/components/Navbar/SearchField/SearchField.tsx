// import { ChangeEvent, useEffect, useState } from "react";
// import axios from "axios";
// import { bookResult, authorResult } from "../../../Globalstate";

// export default function SearchField() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResultsAuthors, setSearchResultsAuthors] = useState<
//     authorResult[] | null
//   >(null); //initially state variable is null(when no data has been fetched yet)
//   const [searchResultsBooks, setSearchResultsBooks] = useState<
//     bookResult[] | null
//   >(null);
//   const [loading, setLoading] = useState(false);
//   //state for loading

//   useEffect(() => {
//     //checks if searchterm is an empty string or contains whitespce characters
//     if (searchTerm.trim() === "") {
//       setSearchResultsAuthors(null);
//       setSearchResultsBooks(null);
//       return;
//     }
//     //show loading
//     setLoading(true);

//     axios
//       .get("https://openlibrary.org/search/authors.json?q=j%20k%20rowling")
//       .then((res) => {
//         console.log(res.data); // log response data
//         setSearchResultsAuthors(res.data.results);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setSearchResultsAuthors([]);
//       });

//     axios
//       .get("https://openlibrary.org/search.json?title=")
//       .then((res) => {
//         console.log(res.data);
//         setSearchResultsBooks(res.data.docs);
//       })
//       .catch((err) => {
//         console.error("error fetching:", err);
//         setSearchResultsBooks([]);
//       })

//       .finally(() => {
//         setLoading(false);
//       });
//   }, [searchTerm]);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };
//   const handleSearch = async () => {
//     try {
//       //show loading
//       setLoading(true);

//       const responseAuthors = await axios.get<authorResult>(
//         `https://openlibrary.org/search/authors.json?q=${searchTerm}`
//       );
//       setSearchResultsAuthors(responseAuthors.data.docs);

//       const responseBooks = await axios.get<bookResult>(
//         `"https://openlibrary.org/search.json?title=${searchTerm}"`
//       );
//       setSearchResultsBooks(responseBooks.data.docs);
//     } catch (error) {
//       console.error("error fetching data:", error);
//       setSearchResultsAuthors([]);
//       setSearchResultsBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <label htmlFor='site-search'>Search the site:</label>
//       <input
//         type='search'
//         id='site-search'
//         name='q'
//         value={searchTerm}
//         onChange={handleChange} /* using handle change for input change event */
//       />

//       <button onClick={handleSearch}>Search</button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         searchResultsAuthors &&
//         searchResultsAuthors.length > 0 && (
//           <div>
//             <ul>
//               {searchResultsAuthors.map((doc) => (
//                 <li key={doc.key}>{doc.name}</li>
//               ))}
//             </ul>
//           </div>
//         )
//       )}
//       {searchResultsBooks && searchResultsBooks.length > 0 && (
//         <div>
//           <ul>
//             {searchResultsBooks.map((doc) => (
//               <li key={doc.key}>{doc.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { bookResult, authorResult } from "../../../Globalstate";

export default function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsAuthors, setSearchResultsAuthors] = useState<
    authorResult[] | null
  >(null);
  const [searchResultsBooks, setSearchResultsBooks] = useState<
    bookResult[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      // Empty search term, do nothing
      return;
    }

    try {
      setLoading(true);

      const responseAuthors = await axios.get<authorResult>(
        `https://openlibrary.org/search/authors.json?q=${searchTerm}`
      );
      setSearchResultsAuthors(responseAuthors.data.docs);

      const responseBooks = await axios.get<bookResult>(
        `https://openlibrary.org/search.json?title=${searchTerm}`
      );
      setSearchResultsBooks(responseBooks.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResultsAuthors([]);
      setSearchResultsBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          {searchResultsAuthors && searchResultsAuthors.length > 0 && (
            <div>
              <h2>Authors</h2>
              <ul>
                {searchResultsAuthors.map((author) => (
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

          {searchResultsBooks && searchResultsBooks.length > 0 && (
            <div>
              <h2>Books</h2>
              <ul>
                {searchResultsBooks.map((book) => (
                  <li key={book.key}>{book.title}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}
