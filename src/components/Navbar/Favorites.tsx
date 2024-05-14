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
      <h1>Favorite Items</h1>
      <ul>
        {favorites.map((item) => (
          <li key={isBookResult(item) ? item.key : (item as authorResult).key}>
            {isBookResult(item) ? (
              <div>
                <div>Title: {item.title}</div>
                <div>Author key: {item.author_key}</div>
                <div>Name: {item.name}</div>
                <div>Ebook: {item.ebook_access}</div>
                <div>First publish year: {item.first_publish_year}</div>
                <div>First sentence: {item.first_sentence}</div>
              </div>
            ) : (
              <div>
                <div>Name: {item.name}</div>
                <div>birth date: {item.birth_date}</div>
                <div>death date: {item.death_date}</div>
                <div>Key: {(item as authorResult).key}</div>
                <div>Top subjects: {item.top_subjects}</div>
                <div>Top Work: {item.top_work}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  // Define a type guard function to check if an item is a BookResult/and accepts objects of type bookresults or authorresults
  function isBookResult(item: BookResult | authorResult): item is BookResult {
    return "title" in item;
  }
}
