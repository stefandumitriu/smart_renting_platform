import React, { useCallback } from "react";
import Layout from "../Layout";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { Listing } from "@packages/api/models/listings/listing";
import { FormAutocomplete, FormTextInput } from "../../FormInputsWrappers";
import { StyledTextField } from "../landingPage/SignupForm";
import * as Yup from "yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EditListingRequest } from "../../requests/ListingsRequests";
import _ from "lodash";

const rentalPeriods = ["1 an", "> 1 an", "6 luni", "3 luni"];

const NewListingSchema = Yup.object().shape({
  apartmentId: Yup.string().uuid().required(),
  title: Yup.string().required(),
  price: Yup.number().min(1).required(),
  about: Yup.string(),
  rentalPeriod: Yup.string(),
  availability: Yup.string(),
});

const EditListingPage: React.FC<{}> = () => {
  const theme = useTheme();
  const listing = useLoaderData() as Listing;
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: Listing) => {
      EditListingRequest(
        listing.id,
        _.omit(values, ["id", "apartment", "apartmentId", "photosUrl"])
      ).then(() => navigate("/user/dashboard/landlord/listings"));
    },
    [listing, navigate]
  );
  return (
    <Layout pageTitle="Adauga anunt">
      <Formik
        initialValues={listing}
        onSubmit={handleSubmit}
        validationSchema={NewListingSchema}
      >
        {({ values, handleChange, initialValues }) => (
          <Form>
            <Grid
              item
              container
              xs={10}
              sx={{ minHeight: "100vh" }}
              marginX="auto"
              alignContent="flex-start"
              rowSpacing={4}
            >
              <Grid item xs={12} marginTop={2}>
                <Paper elevation={4}>
                  <Grid item container xs={12} paddingY={2} paddingX={2}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        color={theme.palette.secondary.main}
                      >
                        Selecteaza Apartament
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider flexItem />
                    </Grid>
                    <Grid item container xs={12} marginTop={2}>
                      <Grid item xs={4}>
                        <StyledTextField
                          label="Apartament"
                          name="apartmentId"
                          value={
                            values.apartment.address.streetType +
                            " " +
                            values.apartment.address.streetName +
                            " Nr. " +
                            values.apartment.address.streetNumber +
                            " - " +
                            values.apartment.noOfRooms +
                            " camere"
                          }
                          disabled
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={4}>
                  <Grid item container xs={12} paddingY={2} paddingX={2}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        color={theme.palette.secondary.main}
                      >
                        Informatii Anunt
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider flexItem />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      marginTop={2}
                      columnSpacing={2}
                      justifyContent="space-between"
                    >
                      <Grid item xs={6}>
                        <FormTextInput<string>
                          name="title"
                          label="Titlu"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormTextInput<number>
                          name="price"
                          label="Pret (euro/luna)"
                          type="number"
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} marginTop={2}>
                      <Grid item xs={12}>
                        <FormTextInput<string>
                          name="about"
                          label="Descriere"
                          multiline
                          minRows={3}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      marginTop={2}
                      columnSpacing={2}
                    >
                      <Grid item xs={3}>
                        <FormAutocomplete<string>
                          name="rentalPeriod"
                          label="Perioada de inchirere"
                          value={values.rentalPeriod}
                          options={rentalPeriods}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormTextInput<string>
                          name="availability"
                          label="Disponibilitate"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item container xs={12} justifyContent="end">
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={_.isEqual(values, initialValues)}
                    sx={{ borderRadius: "10px" }}
                  >
                    Salveaza schimbarile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditListingPage;
