import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import Layout from "../Layout";
import React from "react";
import { Link } from "react-router-dom";
import {
  AddCircleOutline,
  Apartment,
  ChatBubble,
  List,
  PlaylistAdd,
} from "@mui/icons-material";

const UserLandlordDashboard: React.FC<{}> = () => {
  const theme = useTheme();
  return (
    <Layout pageTitle="Dashboard Proprietar">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        xs={12}
        alignItems="center"
        rowSpacing={4}
        my={2}
      >
        <Grid item container xs={12} justifyContent="space-evenly">
          <Grid item xs={4}>
            <Link
              to={"/user/dashboard/tenant/favourite-listings"}
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
                  <AddCircleOutline
                    color="secondary"
                    sx={{ height: "50%", width: "50%" }}
                  />
                  <Typography color={theme.palette.secondary.main} variant="h5">
                    Adauga Apartament
                  </Typography>
                </Stack>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={4}>
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
                <PlaylistAdd
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Adauga anunt
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="space-evenly">
          <Grid item xs={4}>
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
                <Apartment
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Apartamentele mele
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={4}>
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
                <List color="secondary" sx={{ height: "50%", width: "50%" }} />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Anunturile mele
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="space-evenly">
          <Grid item xs={4}>
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
                <ChatBubble
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Mesajele mele
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserLandlordDashboard;
