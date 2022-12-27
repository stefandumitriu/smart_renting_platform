import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../Layout";

export default function LandingPage() {
  const theme = useTheme();
  return (
    <Layout>
      <Grid item>
        <Grid
          item
          container
          sx={{
            height: "60vh",
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
        sx={{ height: "40vh" }}
      >
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography align="center">
                Looking for a rent? Browse through our large properties database
                and find the perfect match for you!
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginX: "auto" }}
              >
                Search properties
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography align="center">
                Want to rent your property fast and keep track of all
                applicants? Use our intuitive and secure platform to keep it
                clean!
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginX: "auto" }}
              >
                List a property
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography align="center">
                Not sure about the price/area ratio you're ok with? Visualize it
                using our map and check every apartment surroundings
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginX: "auto" }}
              >
                Show map
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
