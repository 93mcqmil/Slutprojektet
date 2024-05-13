import { useRoutes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Books from "../Navbar/Books";
import Favorites from "../Navbar/Favorites";
import SearchField from "../Navbar/SearchField/SearchField";
import { GlobalStateProvider } from "../../Globalstate";

// ensuring HomePage component remains mounted
// when navigating to the routes
const HomePage: React.FC = () => {
  // Hook to match current url path with defined routes
  const routes = useRoutes([
    { path: "/books", element: <Books /> },
    { path: "/favorites", element: <Favorites /> },
  ]);
  return (
    <>
      {" "}
      <GlobalStateProvider>
        <Navbar />
        <SearchField />

        <main>{routes}</main>
      </GlobalStateProvider>
    </>
  );
};
export default HomePage;

//useRouter provides information about current URL. (allowing components to react to changes in the URL).
// handling navigation
