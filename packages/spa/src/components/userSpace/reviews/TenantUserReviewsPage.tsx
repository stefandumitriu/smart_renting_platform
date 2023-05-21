import Layout from "../../Layout";
import { useLoaderData } from "react-router-dom";
import { UserReview } from "@packages/api/models";
import { Grid, Typography, useTheme } from "@mui/material";
import UserReviewCard from "./UserReviewCard";
import React from "react";

const TenantUseReviewsPage: React.FC = () => {
  const reviews = useLoaderData() as UserReview[];
  const theme = useTheme();
  return (
    <Layout pageTitle="Recenzii Chirias">
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
                Chirias - {reviews[0].user.firstName} {reviews[0].user.lastName}
              </Typography>
            </Grid>
            {reviews.map((review) => (
              <Grid item xs={12}>
                <UserReviewCard review={review} />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item>
            <Typography>Acest user nu are recenzii</Typography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default TenantUseReviewsPage;
