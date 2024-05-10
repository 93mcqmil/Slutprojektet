import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  authorResult,
  authorSearchResult,
  BookResult,
  BookSearchResult,
} from "../../../Globalstate";
import { GlobalStateContext } from "../../../Globalstate";

export default function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResultsAuthors, setSearchResultsAuthors] =
    useState<authorSearchResult | null>(null);
  const [searchResultsBooks, setSearchResultsBooks] =
    useState<BookSearchResult | null>(null);
  const { updateSearchResultsBooks } = useContext(GlobalStateContext);
  const { updateSearchResultsAuthors } = useContext(GlobalStateContext);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchData = async () => {
      if (!searchClicked || searchTerm.trim() === "") {
        return;
      }

      setLoading(true);

      try {
        const authorSearchAPI = `https://openlibrary.org/search/authors.json?q=${searchTerm}&limit=1`;
        const bookSearchAPI = `https://openlibrary.org/search.json?title=${searchTerm}&limit=1`;

        const authorResponse = await fetch(authorSearchAPI);
        const bookResponse = await fetch(bookSearchAPI);

        if (!authorResponse.ok || !bookResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const authorSearchData: authorSearchResult =
          await authorResponse.json();
        const bookSearchData: BookSearchResult = await bookResponse.json();

        setSearchResultsAuthors(authorSearchData);
        console.log("Authors Data:", authorSearchData.docs);

        setSearchResultsBooks(bookSearchData);
        console.log("Books Data:", bookSearchData);
        updateSearchResultsBooks(bookSearchData.docs);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    searchClicked,
    searchTerm,
    updateSearchResultsBooks,
    updateSearchResultsAuthors,
  ]);

  const handleSearch = () => {
    setSearchClicked(true);
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
            searchResultsAuthors.docs &&
            searchResultsAuthors.docs.length > 0 && (
              <div>
                <h2>Authors</h2>
                <ul>
                  {searchResultsAuthors.docs.map((author: authorResult) => (
                    <li key={author.key}>
                      <div>Name: {author.author_name}</div>
                      <div>Birth Date: {author.birth_date}</div>
                      <div>Top Work: {author.top_work}</div>
                      <div>Type: {author.type}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {searchResultsBooks &&
            searchResultsBooks.docs &&
            searchResultsBooks.docs.length > 0 && (
              <div>
                <h2>Books</h2>
                <ul>
                  {searchResultsBooks.docs.map((book: BookResult) => (
                    <li key={book.key}>
                      <div>Title: {book.title}</div>
                      <div>Author key: {book.author_key}</div>
                      {/* <div>Name: {book.author_name}</div> */}
                      <div>Ebook: {book.ebook_access}</div>
                      <div>First publish year: {book.first_publish_year}</div>
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
