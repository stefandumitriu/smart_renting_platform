import {
  Autocomplete,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../Layout";
import { ListAlt, Map } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import neighbourhoods from "../../neighbourhoods.json";

export default function LandingPage() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
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
            <Autocomplete
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="secondary"
                  placeholder="Search for a city or neighbourhood"
                  fullWidth
                />
              )}
              options={neighbourhoods.map((n) => n.neighbourhood)}
              clearOnBlur
              selectOnFocus
              freeSolo
              onInputChange={(_, value) => {
                setSearchValue(value);
              }}
              open={searchValue.length > 2}
              autoHighlight
              onChange={(_, value) => navigate(`/properties?area=${value}`)}
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
