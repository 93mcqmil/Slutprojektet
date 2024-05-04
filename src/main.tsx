import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import Books from "./components/Navbar/Books";
import Favorites from "./components/Navbar/Favorites";
import ErrorPage from "./error-page";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <HomePage />, // children of homepage(click any of these paths and Navbar follows)
    children: [
      { path: "/books", element: <Books /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
