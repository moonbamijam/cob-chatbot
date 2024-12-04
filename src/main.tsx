import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// providers
import ChatbotProvider from "@providers/ChatbotProvider";
import AuthProvider from "@providers/AuthProvider";
import UserProvider from "@providers/UserProvider";
import ThemeProvider from "@providers/ThemeProvider";
import ChatProvider from "@providers/ChatProvider";

// contstants
import { baseUrl } from "@constants/url/base-url";

// pages
import Home from "@app/Home";
import CityHall from "@app/CityHall";
import Error from "@app/Error";

// css
import "@styles/globals.css";
import "@styles/custom-media-query.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: localStorage.getItem("uid") ? <CityHall /> : <Home />,
      errorElement: <Error />,
    },
    {
      path: "/bacoor-gov",
      element: <CityHall />,
      errorElement: <Error />,
    },
    {
      path: "*",
      element: <Error />,
      errorElement: <Error />,
    },
  ],
  {
    basename: baseUrl,
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatbotProvider>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <ChatProvider>
              <RouterProvider router={router} />
            </ChatProvider>
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </ChatbotProvider>
  </StrictMode>,
);
