import { useRoutes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Favorites from "../Navbar/Favorites";
import { GlobalStateProvider } from "../Contexts/Globalstate";
import "tailwindcss/tailwind.css";
import { HomePageContent } from "./HomePageContent";
import About from "../Navbar/About";
import ReadBooks from "../Navbar/ReadBooks";

// HomePage component
const HomePage: React.FC = () => {
  // Hook to match current url path with defined routes
  const routes = useRoutes([
    { path: "/", element: <HomePageContent /> },
    { path: "/about", element: <About /> },
    { path: "/favorites", element: <Favorites /> },
    { path: "/read books", element: <ReadBooks /> },
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
