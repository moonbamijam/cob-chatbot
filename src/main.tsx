import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// providers
import ThemeProvider from "@providers/ThemeProvider";
import AuthProvider from "@providers/AuthProvider";
import ChatProvider from "@providers/ChatProvider";

// pages
import Home from "@app/Home";
import CityHall from "@app/CityHall";
import Error from "@app/Error";

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
