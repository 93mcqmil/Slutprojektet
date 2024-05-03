import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='nav-container'>
      <ul>
        <Link to={"/"} className='sidetext'>
          Open Library
        </Link>

        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/books"}>Books</Link>
        </li>
        <li>
          <Link to={"/favourites"}>Favourites</Link>
        </li>
      </ul>
    </nav>
  );
}
