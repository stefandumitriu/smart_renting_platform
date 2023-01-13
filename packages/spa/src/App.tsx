import LandingPage from "./components/landingPage/LandingPage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapPage from "./components/mapPage/MapPage";
import ListingsPage from "./components/propertiesPage/ListingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/properties",
    element: <ListingsPage />,
  },
]);
function App() {
  return (
    <div style={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
