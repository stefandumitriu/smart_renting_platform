import React from "react";
import Layout from "../Layout";
import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import {
  ChatBubble,
  ContentPaste,
  Favorite,
  FormatListBulleted,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserTenantDashboard: React.FC<{}> = () => {
  const theme = useTheme();
  return (
    <Layout pageTitle="Dashboard chirias">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        xs={12}
        alignItems="center"
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
                  <Favorite
                    color="secondary"
                    sx={{ height: "50%", width: "50%" }}
                  />
                  <Typography color={theme.palette.secondary.main} variant="h5">
                    Anunturi favorite
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
                <FormatListBulleted
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Cererile mele de chirie
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
                  Mesajele Mele
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
                <ContentPaste
                  color="secondary"
                  sx={{ height: "50%", width: "50%" }}
                />
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Contract Curent
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserTenantDashboard;
