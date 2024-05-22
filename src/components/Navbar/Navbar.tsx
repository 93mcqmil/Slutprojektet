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
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/favorites"}>Favorites</Link>
        </li>
        <li>
          <Link to={"/read books"}>Read Books</Link>
        </li>
      </ul>
    </nav>
  );
}
