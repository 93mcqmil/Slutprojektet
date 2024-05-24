import { useLocation } from "react-router-dom";
import SearchField from "../SearchField/SearchField";

export const HomePageContent: React.FC = () => {
  const { pathname } = useLocation();

  //  only render if "/"
  if (pathname === "/") {
    return (
      <div>
        <SearchField />
      </div>
    );
  } else {
    return null; // Render no paths
  }
};
