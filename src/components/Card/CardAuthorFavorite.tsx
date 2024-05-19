import React from "react";
import { authorResult } from "../../Globalstate";

interface AuthorCardFavoritesProps {
  author: authorResult;
  onRemoveFromFavorites: (item: authorResult) => void;
}

const AuthorCardFavorites: React.FC<AuthorCardFavoritesProps> = ({
  author,
  onRemoveFromFavorites,
}) => {
  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites(author);
  };

  return (
    <div className='author-card-favorites'>
      <h2>{author.name}</h2>
      <p>Birth Date: {author.birth_date}</p>
      <div>Death Date: {author.death_date}</div>
      <div>Top Subjects: {author.top_subjects}</div>
      <div>Top Work: {author.top_work}</div>
      <button onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
    </div>
  );
};

export default AuthorCardFavorites;
