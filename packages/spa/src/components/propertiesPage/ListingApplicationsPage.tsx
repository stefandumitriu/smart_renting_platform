import React from "react";
import Layout from "../Layout";
import { useLoaderData } from "react-router-dom";
import { Application } from "@packages/api/models/listings/application";
import { Typography } from "@mui/material";

const ListingApplicationsPage: React.FC<{}> = () => {
  const applications = useLoaderData() as Application[];
  return (
    <Layout pageTitle="Cereri de inchiriere">
      {applications.map((application) => (
        <Typography>{application.id}</Typography>
      ))}
    </Layout>
  );
};

export default ListingApplicationsPage;
