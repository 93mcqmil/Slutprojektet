import React, { useContext } from "react";
import { GlobalStateContext } from "../../Globalstate";
import { BookResult } from "../Interface/Interface.ts";
import BookCardFavorites from "../Card/CardBookFavorites.tsx";

export default function ReadBooks() {
  const { readBooks, removeReadBooks } = useContext(GlobalStateContext);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>All my read books</h1>
      <div className='flex flex-wrap -mx-2'>
        {readBooks.map((item) => (
          <div key={item.id} className='p-2 w-full md:w-1/2 lg:w-1/3'>
            <BookCardFavorites
              book={item}
              onRemoveFromFavorites={removeReadBooks}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
