import LandingPage from "./components/landingPage/LandingPage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
    return(
        <ThemeProvider theme={theme}>
            <LandingPage />
        </ThemeProvider>
    );
}

export default App;