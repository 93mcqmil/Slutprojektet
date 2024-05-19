import { useRoutes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Books from "../Navbar/Books";
import Favorites from "../Navbar/Favorites";

import { GlobalStateProvider } from "../../Globalstate";
import "tailwindcss/tailwind.css";
import { HomePageContent } from "./HomePageContent";

// HomePage component
const HomePage: React.FC = () => {
  // Hook to match current url path with defined routes
  const routes = useRoutes([
    { path: "/", element: <HomePageContent /> },
    { path: "/books", element: <Books /> },
    { path: "/favorites", element: <Favorites /> },
  ]);

  return (
    <>
      <GlobalStateProvider>
        <Navbar />
        <main>{routes}</main>
      </GlobalStateProvider>
    </>
  );
};
export default HomePage;

//useRouter provides information about current URL. (allowing components to react to changes in the URL).
// handling navigation
