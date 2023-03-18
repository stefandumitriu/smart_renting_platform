import LandingPage from "./components/landingPage/LandingPage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapPage from "./components/mapPage/MapPage";
import ListingsPage from "./components/propertiesPage/ListingsPage";
import PropertyPage from "./components/propertiesPage/PropertyPage";
import listingsPageLoader from "./loaders/ListingsPageLoader";
import propertyPageLoader from "./loaders/PropertyPageLoader";
import { AuthContext } from "./contexts/AuthContext";
import { useState } from "react";
import { UserProfile } from "@packages/api/models/users/userProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "map",
    element: <MapPage />,
  },
  {
    path: "properties",
    children: [
      {
        index: true,
        element: <ListingsPage />,
        loader: listingsPageLoader,
      },
      {
        path: ":id",
        element: <PropertyPage />,
        loader: propertyPageLoader,
      },
    ],
  },
]);
function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | undefined>(
    undefined
  );

  const authContextValue = { currentUser, setCurrentUser };
  return (
    <AuthContext.Provider value={authContextValue}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
