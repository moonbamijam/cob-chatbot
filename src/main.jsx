import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// providers
import ThemesProvider from "./contexts/ThemesProvider.jsx";

// pages
import Home from "./app/Home.jsx";
import CityHall from "./app/CityHall.jsx";
import Error from "./app/Error.jsx";

// css
import "./styles/globals.css";
import "./styles/custom-media-query.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/bacoor-gov",
    element: <CityHall />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemesProvider>
      <RouterProvider router={router} />
    </ThemesProvider>
  </React.StrictMode>,
);
