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
  const [searchType, setSearchType] = useState("author"); // Default to searching for authors
  const [loading, setLoading] = useState(false);
  const [searchResultsAuthors, setSearchResultsAuthors] =
    useState<authorSearchResult | null>(null);
  const [searchResultsBooks, setSearchResultsBooks] =
    useState<BookSearchResult | null>(null);
  const { updateSearchResultsBooks } = useContext(GlobalStateContext);
  const { updateSearchResultsAuthors } = useContext(GlobalStateContext);
  const [searchClicked, setSearchClicked] = useState(false);

  //Effect hook to fetch data when search term or searh type changes
  useEffect(() => {
    console.log("useEffect triggered");
    const fetchData = async () => {
      if (!searchClicked || searchTerm.trim() === "") {
        return;
      }

      setLoading(true);

      try {
        let apiURL = "";
        // construct API url based on search type
        if (searchType === "author") {
          apiURL = `https://openlibrary.org/search/authors.json?q=${searchTerm}&limit=5`;
        } else {
          apiURL = `https://openlibrary.org/search.json?title=${searchTerm}&limit=1`;
        }

        //fetch data from api
        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        //parse response json
        const searchData = await response.json();

        //update state based on search type
        if (searchType === "author") {
          setSearchResultsAuthors(searchData);
          console.log("Authors Data:", searchData.docs);
        } else {
          setSearchResultsBooks(searchData);
          console.log("Books Data:", searchData);
          updateSearchResultsBooks(searchData.docs);
        }
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
    searchType,
    updateSearchResultsBooks,
    updateSearchResultsAuthors,
  ]);

  const handleSearch = () => {
    setSearchClicked(true);
  };

  //handler for search term input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // event handler for search type select change
  const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
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

      <select
        id='search-type'
        value={searchType}
        onChange={handleSearchTypeChange}
      >
        <option value='author'>Author</option>
        <option value='book'>Book</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchType === "author" &&
            searchResultsAuthors &&
            searchResultsAuthors.docs &&
            searchResultsAuthors.docs.length > 0 && (
              <div>
                <h2>Authors</h2>
                <ul>
                  {searchResultsAuthors.docs.map((author: authorResult) => (
                    <li key={author.key}>
                      <div>Name: {author.name}</div>
                      <div>Birth Date: {author.birth_date}</div>
                      <div>Type: {author.type}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {searchType === "book" &&
            searchResultsBooks &&
            searchResultsBooks.docs &&
            searchResultsBooks.docs.length > 0 && (
              <div>
                <h2>Books</h2>
                <ul>
                  {searchResultsBooks.docs.map((book: BookResult) => (
                    <li key={book.key}>
                      <div>Title: {book.title}</div>
                      <div>Author key: {book.author_key}</div>
                      <div>Name: {book.author_name}</div>
                      <div>Ebook: {book.ebook_access}</div>
                      <div>First publish year: {book.first_publish_year}</div>
                      <div>Top Work: {book.top_work}</div>
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
