import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import Favorites from "./components/Navbar/Favorites";
import ErrorPage from "./error-page";
import About from "./components/Navbar/About";
import ReadBooks from "./components/Navbar/ReadBooks";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <HomePage />, // children of homepage(click any of these paths and Navbar follows)
    children: [
      { path: "/about", element: <About /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/read books", element: <ReadBooks /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
