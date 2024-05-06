import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { searchResult } from "../../../Globalstate";

export default function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<searchResult[] | null>(
    null
  ); //initially state variable is null(when no data has been fetched yet)
  const [loading, setLoading] = useState(false);
  //state for loading

  useEffect(() => {
    //checks if searchterm is an empty string or contains whitespce characters
    if (searchTerm.trim() === "") {
      setSearchResults(null);
      return;
    }
    //show loading
    setLoading(true);

    axios
      .get("https://openlibrary.org/search/authors.json?q=j")
      .then((res) => {
        console.log(res.data); // log response data
        setSearchResults(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setSearchResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = async () => {
    try {
      //show loading
      setLoading(true);

      const response = await axios.get<searchResult>(
        `https://openlibrary.org/search/authors.json?q=${searchTerm}`
      );
      setSearchResults(response.data.docs);
    } catch (error) {
      console.error("error fetching data:", error);
      setSearchResults([]);
    } finally {
      //hide loading indicator when request is complete
      setLoading(false);
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
        onChange={handleChange} /* using handle change for input change event */
      />

      <button onClick={handleSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        searchResults &&
        searchResults.length > 0 && (
          <ul>
            {searchResults.map((doc) => (
              <li key={doc.key}>{doc.name}</li>
            ))}
          </ul>
        )
      )}
    </>
  );
}
