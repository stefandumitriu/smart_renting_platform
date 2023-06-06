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
import ImageButtonComponent from "./ImageButton";

export default function LandingPage() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  return (
    <Layout>
      <Grid item container xs={12}>
        <Grid
          item
          container
          sx={{
            minHeight: "40vh",
            width: "100%",
            color: theme.palette.background.default,
          }}
          justifyContent="space-around"
          xs={12}
        >
          <Grid item xs={8} alignSelf="center">
            <Autocomplete
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="secondary"
                  placeholder="Cauta o proprietate in cartierul dorit"
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
        <Grid
          item
          container
          justifyContent="space-around"
          alignContent="center"
          sx={{ height: "60vh" }}
          xs={12}
        >
          <Grid item xs={10} md={5} sx={{ height: "100%" }}>
            <Link to={"/properties"} style={{ textDecoration: "none" }}>
              <ImageButtonComponent
                width="100%"
                url="https://img.freepik.com/free-photo/aerial-photography-villa-complex-luxury-resort_1205-9756.jpg?w=1060&t=st=1686060551~exp=1686061151~hmac=2fcf0e3387657240ebff5d7d1cd118cb63d92a03fb651d7fcb7c70c6da33660a"
                title="Lista proprietati"
              />
            </Link>
          </Grid>
          <Grid item xs={10} md={5} sx={{ height: "100%" }}>
            <Link to={"/map"} style={{ textDecoration: "none" }}>
              <ImageButtonComponent
                width="100%"
                url="http://127.0.0.1:8080/local_storage/view_map_image.jpg"
                title="Vezi harta"
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
