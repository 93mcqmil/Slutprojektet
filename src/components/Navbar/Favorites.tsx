import React, { useContext } from "react";
import {
  GlobalStateContext,
  BookResult,
  authorResult,
} from "../../Globalstate";

export default function Favorites() {
  const { favorites } = useContext(GlobalStateContext);

  return (
    <div>
      <h1>Favorite author</h1>
      <ul>
        {favorites.map((item) => (
          <li key={item.key}>
            {item.type === "book" ? (
              <div>
                <div>Title: {item.title}</div>
                <div>Author key: {item.author_key}</div>
                <div>Name: {item.author_name}</div>
                <div>Ebook: {item.ebook_access}</div>
                <div>First publish year: {item.first_publish_year}</div>
                <div>Top Work: {item.top_work}</div>
              </div>
            ) : (
              <div>
                <div>Key: {item.key}</div>
                <div>Name: {item.name}</div>
                <div>Top Work: {item.top_work}</div>
                <div>Birth Date: {item.birth_date}</div>
                <div>Type: {item.type}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
