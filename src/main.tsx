import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// providers
import ThemeProvider from "@providers/ThemeProvider.js";
import AuthProvider from "@providers/AuthProvider.js";
import ChatProvider from "@providers/ChatProvider.js";

// pages
import Home from "@app/Home.js";
import CityHall from "@app/CityHall.js";
import Error from "@app/Error.js";

// css
import "@styles/globals.css";
import "@styles/custom-media-query.css";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ChatProvider>
          <RouterProvider router={router} />
        </ChatProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
