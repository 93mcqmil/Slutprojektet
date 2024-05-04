import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

export default function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResult([]);
      return;
    }
    axios
      .get("https://openlibrary.org/search/authors.json?q=j")
      .then((res) => {
        console.log(res.data); // log response data
        setSearchResult(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setSearchResult([]);
      });
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    // search filtering based on searchterm
    const filteredResults = searchResult.filter((item) => {
      // each item has a title property to search against
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    // update searchresult state with filtered results
    setSearchResult(filteredResults);
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
      {searchResult && searchResult.length > 0 && (
        <ul>
          {searchResult.map((item) => (
            <li key={item.key}>{item.names}</li>
          ))}
        </ul>
      )}
    </>
  );
}
