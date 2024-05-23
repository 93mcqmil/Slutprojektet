//Define functions for API URL
export const AUTHOR_SEARCH_API = "https://openlibrary.org/search/authors.json";
export const TITLE_SEARCH_API = "https://openlibrary.org/search.json";

export const fetchBooks = async (searchType: string, searchTerm: string) => {
    let apiURL = "";

    // API url based on search type
    if (searchType === "author") {
        apiURL = `${AUTHOR_SEARCH_API}?q=${searchTerm}&limit=10`;
    } else {
        apiURL = `${TITLE_SEARCH_API}?title=${searchTerm}&limit=10`;
    }
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();

}

