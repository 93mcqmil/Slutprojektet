import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  authorResult,
  authorSearchResult,
  BookResult,
  BookSearchResult,
} from "../../../Globalstate";
import { GlobalStateContext } from "../../../Globalstate";
import { Link } from "react-router-dom";

export default function SearchField() {
  const { favorites, addToFavorites } = useContext(GlobalStateContext);
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
    const fetchData = async () => {
      if (!searchClicked || searchTerm.trim() === "") {
        return;
      }

      setLoading(true);
      setSearchClicked(false); //Reset searchClicked at the beginning of searchClicked to prevent endless loop

      try {
        let apiURL = "";
        // construct API url based on search type
        if (searchType === "author") {
          apiURL = `https://openlibrary.org/search/authors.json?q=${searchTerm}&limit=5`;
        } else {
          apiURL = `https://openlibrary.org/search.json?title=${searchTerm}&limit=5`;
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
  //Effect hook to fetch data when search term or search type changes

  const handleSearch = () => {
    setSearchClicked(true);
    console.log("Search Clicked:", true);
  };

  //handler for search term input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("Search Term changed:", event.target.value);
  };

  // event handler for search type select change
  const handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
    console.log("Search Type Changed:", event.target.value);
  };

  const handleAddToFavorites = (item: BookResult | authorResult) => {
    // check if item exists in favorites
    if (favorites.some((fav) => fav.key === item.key)) {
      alert("Its already in your favorites!");
    } else {
      addToFavorites(item);
    }
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
                      Name:{" "}
                      <Link to={`/author/${author.key}`}>{author.name}</Link>
                      {/* <div>Name: {author.name}</div> */}
                      <div>Birth Date: {author.birth_date}</div>
                      <div>Death date: {author.death_date}</div>
                      <div>Key: {author.key}</div>
                      <div>Top subjects: {author.top_subjects}</div>
                      <div>Top work: {author.top_work} </div>
                      <button onClick={() => handleAddToFavorites(author)}>
                        Add to Favorites
                      </button>
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
                      {book.cover_i && (
                        <div>
                          <img
                            src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt={book.title}
                          />
                        </div>
                      )}
                      <div>Author key: {book.author_key}</div>
                      <div>Name: {book.author_name}</div>
                      <div>Ebook: {book.ebook_access}</div>
                      <div>First publish year: {book.first_publish_year}</div>
                      <div>First sentence: {book.first_sentence}</div>
                      <button onClick={() => handleAddToFavorites(book)}>
                        Add to Favorites
                      </button>
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
