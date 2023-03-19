import React from "react";
import Layout from "../Layout";
import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Business, ManageAccounts, Shop } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserHomeDashboard: React.FC<{}> = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
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
                <Shop color="secondary" sx={{ height: "50%", width: "50%" }} />
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
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserHomeDashboard;
