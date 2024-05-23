import { useContext } from "react";
import { BookResult, authorResult } from "../Interface/Interface";
import { GlobalStateContext } from "../Contexts/Globalstate";

//custom hook to use globalState & placed inside function body
const useGlobalState = () => {
    const { readBooks, addToReadBooks, favorites, addToFavorites } = useContext(GlobalStateContext);
    return { readBooks, addToReadBooks, favorites, addToFavorites }

}


export const handleReviewSubmit = (book: BookResult, review: string) => {
    console.log(`Review for ${book.title}: ${review}`);
};
/*************************************************************************** */

export const useHandleAddToReadBooks = () => {
    const { readBooks, addToReadBooks } = useGlobalState();

    const handleAddToReadBooks = (item: BookResult) => {

        if (readBooks.some((book) => book.key === item.key)) {
            alert("Its already added my friend!");
        } else {
            addToReadBooks(item);
        }

    };
    return handleAddToReadBooks;
}
/****************************************************** */
export const useHandleAddToFavorites = () => {
    const { favorites, addToFavorites } = useGlobalState();

    const handleAddToFavorites = (item: BookResult | authorResult) => {
        // check if item exists in favorites
        if (favorites.some((fav) => fav.key === item.key)) {
            alert("Its already in your favorites!");
        } else {
            addToFavorites(item);
        }
    };
    return handleAddToFavorites;
}