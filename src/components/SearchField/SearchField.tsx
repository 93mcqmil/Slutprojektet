import { ChangeEvent, useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../Contexts/Globalstate";
import BookCardSearch from "../Card/BookCardSearch";
import AuthorCardSearch from "../Card/CardAuthorSearch";
import {
  handleReviewSubmit,
  useHandleAddToReadBooks,
  useHandleAddToFavorites,
} from "../utilities/Utils";
import {
  BookResult,
  BookSearchResult,
  authorResult,
  authorSearchResult,
} from "../Interface/Interface";
import { fetchBooks } from "../utilities/Fetch";

//*************************************************************************** */

export default function SearchField() {
  const handleAddToReadBooks = useHandleAddToReadBooks();
  const handleAddToFavorites = useHandleAddToFavorites();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("author");
  const [loading, setLoading] = useState(false);
  const [searchResultsAuthors, setSearchResultsAuthors] =
    useState<authorSearchResult | null>(null);
  const [searchResultsBooks, setSearchResultsBooks] =
    useState<BookSearchResult | null>(null);
  const { updateSearchResultsBooks, updateSearchResultsAuthors } =
    useContext(GlobalStateContext);

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
        const searchData = await fetchBooks(searchType, searchTerm);

        //update state based on search type
        if (searchType === "author") {
          setSearchResultsAuthors(searchData);
          updateSearchResultsAuthors(searchData.docs);
        } else {
          setSearchResultsBooks(searchData);
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
      <div className='max-w-md mx-auto'>
        <label
          htmlFor='site-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search the site:
        </label>
        <div className='relative flex'>
          <input
            type='search'
            id='site-search'
            name='q'
            value={searchTerm}
            onChange={handleChange}
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search the site...'
          />
          <select
            id='search-type'
            value={searchType}
            onChange={handleSearchTypeChange}
            className='ml-2 bg-white border border-gray-300 rounded-md py-1 px-2 text-gray-900 focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500'
          >
            <option value='author'>Author</option>
            <option value='book'>Book</option>
          </select>
          <button
            onClick={handleSearch}
            className='ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </div>

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
                <div className='flex flex-wrap m-2'>
                  {searchResultsAuthors.docs.map((author: authorResult) => (
                    <div
                      key={author.key}
                      className='p-2 w-full md:w-1/2 lg:w-1/3'
                    >
                      <AuthorCardSearch
                        author={author}
                        onAddToFavorites={handleAddToFavorites}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          {searchType === "book" &&
            searchResultsBooks &&
            searchResultsBooks.docs &&
            searchResultsBooks.docs.length > 0 && (
              <div>
                <h2>Books</h2>
                <div className='flex flex-wrap m-2'>
                  {searchResultsBooks.docs.map((book: BookResult) => (
                    <div
                      key={book.key}
                      className='p-2 w-full md:w-1/2 lg:w-1/3'
                    >
                      <BookCardSearch
                        book={book}
                        onAddToFavorites={handleAddToFavorites}
                        onAddToReadBooks={handleAddToReadBooks}
                        onSubmitReview={handleReviewSubmit}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
}
