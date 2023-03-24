import React, { useCallback, useContext } from "react";
import Layout from "../Layout";
import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Business, Logout, ManageAccounts, Shop } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserHomeDashboard: React.FC<{}> = () => {
  const theme = useTheme();
  const { setCurrentUser } = useContext(AuthContext);
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("currentUser");
    setCurrentUser(undefined);
  }, [setCurrentUser]);
  return (
    <Layout pageTitle="Dashboard Utilizator">
      <Grid container xs={12} sx={{ minHeight: "100vh" }}>
        <Grid
          item
          container
          xs={12}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Link
              to={"/user/dashboard/tenant"}
              style={{ textDecoration: "none" }}
            >
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
                  <Shop
                    color="secondary"
                    sx={{ height: "50%", width: "50%" }}
                  />
                  <Typography color={theme.palette.secondary.main} variant="h5">
                    Dashboard Chirias
                  </Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={3}>
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
                <Business
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Dashboard Proprietar
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Link to={"settings"} style={{ textDecoration: "none" }}>
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
                  <ManageAccounts
                    color="secondary"
                    sx={{ height: "50%", width: "50%" }}
                  />
                  <Typography color={theme.palette.secondary.main} variant="h5">
                    Setari Utilizator
                  </Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              onClick={logoutHandler}
            >
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
                  <Logout
                    color="secondary"
                    sx={{ height: "50%", width: "50%" }}
                  />
                  <Typography color={theme.palette.secondary.main} variant="h5">
                    Log out
                  </Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserHomeDashboard;
