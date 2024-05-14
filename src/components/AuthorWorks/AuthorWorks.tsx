import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorWorks = () => {
  const { authorKey } = useParams<{ authorKey: string }>();
  const [works, setWorks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorWorks = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/authors/${authorKey}/works.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch author's works");
        }
        const data = await response.json();
        console.log("Author's works data:", data); // Log the fetched data
        setWorks(data.entries);
      } catch (error: any) {
        console.error("Error fetching author's works:", error);
        setError(error.message);
      }
    };

    fetchAuthorWorks();
  }, [authorKey]);

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  return (
    <div>
      <h1>Works by Author</h1>
      <ul>
        {works.map((work: any) => (
          <li key={work.key}>{work.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorWorks;
