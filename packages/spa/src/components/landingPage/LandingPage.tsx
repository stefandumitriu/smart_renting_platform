import {
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Layout";
import { ListAlt, Map } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const theme = useTheme();
  return (
    <Layout>
      <Grid item>
        <Grid
          item
          container
          sx={{
            height: "40vh",
            width: "100%",
            color: theme.palette.primary.main,
          }}
          justifyContent="space-around"
        >
          <Grid item alignSelf="center" width="60%">
            <OutlinedInput
              color="secondary"
              placeholder="Search for a city or neighbourhood"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => console.log("clicked")}
                    color="secondary"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-around"
        alignContent="center"
        sx={{ height: "60vh" }}
      >
        <Grid item xs={5} sx={{ height: "80%" }}>
          <Link to={"/properties"} style={{ textDecoration: "none" }}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                ":hover": {
                  boxShadow: 20,
                },
              }}
            >
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ height: "100%" }}
                justifyContent="center"
              >
                <ListAlt
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Search Properties
                </Typography>
              </Stack>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={5} sx={{ height: "80%" }}>
          <Link to={"/map"} style={{ textDecoration: "none" }}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                ":hover": {
                  boxShadow: 20,
                },
              }}
            >
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ height: "100%" }}
                justifyContent="center"
              >
                <Map color="secondary" sx={{ height: "50%", width: "50%" }} />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Show Map
                </Typography>
              </Stack>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
}
