import { useContext } from "react";
import { GlobalStateContext } from "../../Globalstate";
import axios from "axios";

export default function Books() {
  const { allBooks } = useContext(GlobalStateContext);
  return (
    <div>
      <h1>All Books</h1>
    </div>
  );
}
