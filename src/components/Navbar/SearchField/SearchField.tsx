export default function SearchField() {
  return (
    <div className='Search-container'>
      <label htmlFor='site-search'>Search the site:</label>
      <input type='search' id='site-search' name='q' />

      <button>Search</button>
    </div>
  );
}
