import React from "react";
import Layout from "../Layout";
import { Grid, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Listing } from "@packages/api/models/listings/listing";

const PropertyPage: React.FC<{}> = () => {
  const params = useLoaderData() as Listing;
  return (
    <Layout>
      <Grid item sx={{ height: "100vh", width: "100%" }}>
        <Grid item container>
          <Grid item xs={12}>
            <Typography>{params.apartment.noOfRooms}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PropertyPage;
