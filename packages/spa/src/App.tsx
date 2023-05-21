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
import UserLandlordListingsPage from "./components/userSpace/UserLandlordListingsPage";
import UserLandlordApartmentInfoPage from "./components/userSpace/UserLandordApartmentInfoPage";
import apartmentInfoPageLoader from "./loaders/ApartmentInfoPageLoader";
import AddApartmentWizard from "./components/userSpace/CreateApartment/AddApartmentWizard";
import UserLandlordApartments from "./components/userSpace/UserLandlordApartments";
import AddListingPage from "./components/userSpace/AddListingPage";
import ListingApplicationsPage from "./components/propertiesPage/ListingApplicationsPage";
import listingApplicationsLoader from "./loaders/ListingApplicationsPageLoader";
import ApplicationPage from "./components/propertiesPage/ApplicationPage";
import EditListingPage from "./components/userSpace/EditListingPage";
import ContractPage from "./components/userSpace/ContractPage";
import ApartmentReviewsPage from "./components/userSpace/reviews/ApartmentReviewsPage";
import {
  apartmentReviewsLoader,
  landlordUserReviewsLoader,
  tenantUserReviewsLoader,
} from "./loaders/ReviewPageLoaders";
import TenantUseReviewsPage from "./components/userSpace/reviews/TenantUserReviewsPage";
import LandlordUserReviewsPage from "./components/userSpace/reviews/LandlordUserReviewsPage";

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
        children: [
          {
            path: "edit",
            element: <EditListingPage />,
            loader: propertyPageLoader,
          },
          {
            index: true,
            element: <PropertyPage />,
            loader: propertyPageLoader,
          },
          {
            path: "applications",
            children: [
              {
                index: true,
                element: <ListingApplicationsPage />,
                loader: listingApplicationsLoader,
              },
              {
                path: ":id",
                element: <ApplicationPage />,
              },
            ],
          },
        ],
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
              {
                path: "contract",
                element: <ContractPage userIsTenant />,
              },
              {
                path: ":id",
                children: [
                  {
                    path: "reviews",
                    element: <TenantUseReviewsPage />,
                    loader: tenantUserReviewsLoader,
                  },
                ],
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
              {
                path: ":id",
                children: [
                  {
                    path: "reviews",
                    element: <LandlordUserReviewsPage />,
                    loader: landlordUserReviewsLoader,
                  },
                ],
              },
              {
                path: "listings",
                children: [
                  {
                    index: true,
                    element: <UserLandlordListingsPage />,
                  },
                  {
                    path: "create",
                    element: <AddListingPage />,
                  },
                ],
              },
              {
                path: "apartments",
                children: [
                  {
                    index: true,
                    element: <UserLandlordApartments />,
                  },
                  {
                    path: ":id",
                    children: [
                      {
                        path: "contract",
                        element: <ContractPage />,
                      },
                    ],
                  },
                ],
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
  {
    path: "apartments",
    children: [
      {
        path: "create-apartment-wizard",
        element: <AddApartmentWizard />,
      },
      {
        path: ":id",
        children: [
          {
            index: true,
            element: <UserLandlordApartmentInfoPage />,
            loader: apartmentInfoPageLoader,
          },
          {
            path: "reviews",
            element: <ApartmentReviewsPage />,
            loader: apartmentReviewsLoader,
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
