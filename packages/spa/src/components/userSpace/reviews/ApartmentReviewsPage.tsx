import Layout from "../../Layout";
import { useLoaderData } from "react-router-dom";
import { ApartmentReview } from "@packages/api/models";
import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import ApartmentReviewCard from "./ApartmentReviewCard";

const ApartmentReviewsPage: React.FC<{}> = () => {
  const reviews = useLoaderData() as ApartmentReview[];
  const theme = useTheme();
  return (
    <Layout pageTitle="Recenzii Apartament">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        xs={10}
        alignContent="flex-start"
        justifyContent="center"
        marginX="auto"
        marginY={2}
        spacing={4}
      >
        {!!reviews.length ? (
          <>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={theme.palette.secondary.main}
              >
                Apartament - {reviews[0].apartment.address.streetType}{" "}
                {reviews[0].apartment.address.streetName}
                {", Nr. "}
                {reviews[0].apartment.address.streetNumber}
              </Typography>
            </Grid>
            {reviews.map((review) => (
              <Grid item xs={12}>
                <ApartmentReviewCard review={review} />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item>
            <Typography>Acest apartament nu are recenzii</Typography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default ApartmentReviewsPage;
