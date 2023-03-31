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
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "@packages/api/models/users/userProfile";
import UserHomeDashboard from "./components/userSpace/UserHomeDashboard";
import UserTenantDashboard from "./components/userSpace/UserTenantDashboard";
import UserFavouriteListings from "./components/userSpace/UserFavouriteListings";
import { OnComponentInitContext } from "./contexts/OnComponentInitContext";
import UserSettings from "./components/userSpace/UserSettings";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import UserLandlordDashboard from "./components/userSpace/UserLandlordDashboard";
import UserTenantRentApplications from "./components/userSpace/UserTenantRentApplications";

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
  {
    path: "user",
    children: [
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: <UserHomeDashboard />,
          },
          {
            path: "tenant",
            children: [
              {
                index: true,
                element: <UserTenantDashboard />,
              },
              {
                path: "favourite-listings",
                element: <UserFavouriteListings />,
              },
              {
                path: "rent-applications",
                element: <UserTenantRentApplications />,
              },
            ],
          },
          {
            path: "landlord",
            children: [
              {
                index: true,
                element: <UserLandlordDashboard />,
              },
            ],
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
]);
function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | undefined>(
    undefined
  );

  const onInit = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cachedUser = localStorage["currentUser"];
    if (cachedUser !== null && cachedUser !== undefined) {
      setCurrentUser(JSON.parse(cachedUser) as UserProfile);
    }
  }, []);

  useEffect(() => {
    if (currentUser !== undefined) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const authContextValue = { currentUser, setCurrentUser };
  return (
    <AuthContext.Provider value={authContextValue}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <OnComponentInitContext.Provider value={onInit}>
            <RouterProvider router={router} />
          </OnComponentInitContext.Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </AuthContext.Provider>
  );
}

export default App;
