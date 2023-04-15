import { Apartment } from "@packages/api/models/listings/apartment";
import React, { useCallback } from "react";
import Layout from "../Layout";
import { Grid, Paper, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { useLoaderData } from "react-router-dom";

const UserLandlordApartmentInfoPage: React.FC<{}> = () => {
  const theme = useTheme();
  const apartment = useLoaderData() as Apartment;
  console.log(apartment);
  const handleSubmit = useCallback((values: Apartment) => {
    console.log(values);
  }, []);
  return (
    <Layout pageTitle="Informatii Apartament">
      <Formik initialValues={apartment} onSubmit={handleSubmit}>
        {({ values, handleChange }) => {
          return (
            <Form>
              <Grid
                item
                container
                xs={12}
                sx={{ minHeight: "100vh" }}
                alignContent="start"
              >
                <Grid item xs={12} paddingX={2}>
                  <Paper
                    sx={{ width: "100%", borderRadius: "20px" }}
                    elevation={4}
                  ></Paper>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default UserLandlordApartmentInfoPage;
