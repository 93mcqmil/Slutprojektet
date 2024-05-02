import { useRoutes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Books from "./Navbar/Books";
import Favorites from "./Navbar/Favorites";

const HomePage: React.FC = () => {
  const routes = useRoutes([
    { path: "/books", element: <Books /> },
    { path: "/favorites", element: <Favorites /> },
  ]);
  return (
    <>
      <Navbar />
      <main>{routes}</main>
    </>
  );
};
export default HomePage;
