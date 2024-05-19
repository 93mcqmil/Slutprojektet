import { useLocation } from "react-router-dom";
import SearchField from "../Navbar/SearchField/SearchField";

export const HomePageContent: React.FC = () => {
  const { pathname } = useLocation();

  // Render the SearchField only if the current path is the homepage
  if (pathname === "/") {
    return (
      <div>
        <SearchField />
      </div>
    );
  } else {
    return null; // Render nothing for other paths
  }
};
