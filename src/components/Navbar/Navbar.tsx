import "./Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='nav-container'>
      <NavLink to={"/"}>Open Library</NavLink>

      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/books"}>Books</NavLink>
      </li>
      <li>
        <NavLink to={"/favourites"}>Favourites</NavLink>
      </li>
    </nav>
  );
}
