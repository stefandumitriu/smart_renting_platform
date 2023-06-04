import React from "react";
import Layout from "../Layout";
import { Link, useLoaderData } from "react-router-dom";
import { Application } from "@packages/api/models/listings/application";
import { Grid, Paper, Theme, Typography, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ApplicationCardParams {
  application: Application;
}

enum ApplicationStatus {
  Waiting = "Waiting",
  Approved = "Approved",
  Rejected = "Rejected",
}

enum Months {
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
}

const translateApplicationStatus: (status: ApplicationStatus) => string = (
  status
) => {
  switch (status) {
    case ApplicationStatus.Approved:
      return "Aprobat";
    case ApplicationStatus.Waiting:
      return "In asteptare";
    case ApplicationStatus.Rejected:
      return "Refuzat";
  }
};

const statusColor: (status: ApplicationStatus, theme: Theme) => string = (
  status,
  theme
) => {
  switch (status) {
    case ApplicationStatus.Approved:
      return theme.palette.success.light;
    case ApplicationStatus.Waiting:
      return theme.palette.warning.main;
    case ApplicationStatus.Rejected:
      return theme.palette.error.main;
  }
};

const formatDate = (date: Date) => {
  const d = new Date(date);
  return `${d.getDay()} ${
    Months[d.getMonth()]
  } ${d.getFullYear()}, ${d.getHours()}:${
    d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
  }`;
};

const ApplicationCard: React.FC<ApplicationCardParams> = ({
  application,
}: ApplicationCardParams) => {
  const theme = useTheme();
  return (
    <Link
      to={`${application.id}`}
      style={{ textDecoration: "none" }}
      state={{ application }}
    >
      <Paper
        sx={{
          width: "100%",
          borderRadius: "20px",
          padding: "8px 8px 8px 8px",
          ":hover": {
            boxShadow: 20,
          },
        }}
        elevation={4}
      >
        <Grid container justifyContent="space-between">
          <Grid item container xs={8}>
            <Grid item container xs={12} spacing={2}>
              <Grid item>
                <Typography fontWeight="600">
                  Cerere facuta de {application.tenant.firstName}{" "}
                  {application.tenant.lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  color={statusColor(application.status, theme)}
                  fontWeight="bold"
                >
                  {translateApplicationStatus(application.status)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Pe data de {formatDate(application.created_at)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ChevronRightIcon />
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
};

const ListingApplicationsPage: React.FC = () => {
  const applications = useLoaderData() as Application[];
  const theme = useTheme();
  return (
    <Layout pageTitle="Cereri de inchiriere">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        xs={10}
        spacing={4}
        alignContent="flex-start"
        marginX="auto"
        my={1}
      >
        {applications && applications.length > 0 ? (
          <>
            <Grid item xs={12} marginTop={-4}>
              <Typography variant="h2" color={theme.palette.secondary.main}>
                Cereri de inchiriere
              </Typography>
            </Grid>
            <Grid item container xs={12} marginBottom={2} marginTop={-4}>
              <Grid item>
                <LocationOnIcon color={"secondary"} />
              </Grid>
              <Grid item>
                <Typography variant="h6" color={theme.palette.secondary.main}>
                  {applications[0].listing.apartment.address.streetType}{" "}
                  {applications[0].listing.apartment.address.streetName}, Nr.{" "}
                  {applications[0].listing.apartment.address.streetNumber}
                  {" - "}
                  {applications[0].listing.apartment.noOfRooms}{" "}
                  {applications[0].listing.apartment.noOfRooms > 1
                    ? "camere"
                    : "camera"}
                </Typography>
              </Grid>
            </Grid>
            {applications.map((application) => (
              <Grid item xs={8}>
                <ApplicationCard application={application} />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item container xs={12} justifyContent="center">
            <Grid item>
              Nu exista cereri de inchiriere pentru acest apartament
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default ListingApplicationsPage;
