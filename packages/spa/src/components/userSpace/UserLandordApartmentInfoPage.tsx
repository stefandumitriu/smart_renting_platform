import { Apartment } from "@packages/api/models/listings/apartment";
import React, { useCallback, useState } from "react";
import Layout from "../Layout";
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useLoaderData } from "react-router-dom";
import { FormAutocomplete } from "../../FormInputsWrappers";
import { StreetTypeEnum } from "@packages/db/models/listings/address";
import { StyledTextField } from "../landingPage/SignupForm";
import _ from "lodash";
import {
  HeatingTypeEnum,
  SubdivisonTypeEnum,
} from "@packages/db/models/listings/apartment";
import { PatchApartmentRequest } from "../../requests/ApartmentsRequests";

const UserLandlordApartmentInfoPage: React.FC<{}> = () => {
  const theme = useTheme();
  const loaderData = useLoaderData() as Apartment;
  const [apartment, setApartment] = useState<Apartment>(loaderData);
  const handleSubmit = useCallback(async (values: Apartment) => {
    const updatedApartment = await PatchApartmentRequest(values.id, values);
    setApartment(updatedApartment);
  }, []);
  return (
    <Layout pageTitle="Informatii Apartament">
      <Formik
        initialValues={apartment}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, initialValues }) => {
          return (
            <Form>
              <Grid
                item
                container
                xs={10}
                sx={{ minHeight: "100vh" }}
                alignContent="start"
                justifyContent="center"
                paddingY={4}
                marginX="auto"
                rowSpacing={4}
              >
                <Grid item xs={12} paddingX={2}>
                  <Paper
                    sx={{ width: "100%", borderRadius: "20px" }}
                    elevation={4}
                  >
                    <Grid container item xs={12} paddingY={2} paddingX={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          color={theme.palette.secondary.main}
                        >
                          Adresa
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider flexItem />
                      </Grid>
                      <Grid item container xs={12} marginTop={2} rowSpacing={2}>
                        <Grid item container xs={12} spacing={2}>
                          <Grid item xs={4}>
                            <FormAutocomplete<StreetTypeEnum>
                              name="address.streetType"
                              label="Tip strada"
                              options={Object.values(StreetTypeEnum)}
                              value={values.address.streetType}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <StyledTextField
                              name="address.streetName"
                              label="Nume strada"
                              value={values.address.streetName}
                              fullWidth
                              required
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="address.streetNumber"
                              label="Numar"
                              value={values.address.streetNumber}
                              fullWidth
                              onChange={handleChange}
                              required
                              type="number"
                            />
                          </Grid>
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="address.block"
                              label="Nume bloc"
                              value={values.address.block}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="address.blockEntrence"
                              label="Scara"
                              value={values.address.blockEntrance}
                              fullWidth
                              type="number"
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="address.floor"
                              label="Etaj"
                              value={values.address.floor}
                              fullWidth
                              type="number"
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="address.flatNumber"
                              label="Numar apartament"
                              value={values.address.flatNumber}
                              fullWidth
                              type="number"
                              onChange={handleChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} paddingX={2}>
                  <Paper
                    sx={{ width: "100%", borderRadius: "20px" }}
                    elevation={4}
                  >
                    <Grid container item xs={12} paddingY={2} paddingX={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h4"
                          color={theme.palette.secondary.main}
                        >
                          Detalii
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider flexItem />
                      </Grid>
                      <Grid item container xs={12} marginTop={2} rowSpacing={2}>
                        <Grid item container xs={12} spacing={2}>
                          <Grid item xs={4}>
                            <FormAutocomplete<SubdivisonTypeEnum>
                              name="subdivision"
                              label="Compartimentare"
                              options={Object.values(SubdivisonTypeEnum)}
                              value={values.subdivision}
                              required
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="noOfRooms"
                              label="Numar camere"
                              value={values.noOfRooms}
                              fullWidth
                              onChange={handleChange}
                              required
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="noOfBathrooms"
                              label="Numar bai"
                              value={values.noOfBathrooms}
                              fullWidth
                              onChange={handleChange}
                              required
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="noOfBalconies"
                              label="Numar balcoane"
                              value={values.noOfBalconies}
                              fullWidth
                              onChange={handleChange}
                              required
                              type="number"
                            />
                          </Grid>
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                          <Grid item xs={2}>
                            <StyledTextField
                              name="surface"
                              label="Suprafata (mp.)"
                              value={values.surface}
                              fullWidth
                              onChange={handleChange}
                              required
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormAutocomplete<HeatingTypeEnum>
                              name="heating"
                              label="Tip incalzire"
                              value={values.heating}
                              options={Object.values(HeatingTypeEnum)}
                              required
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {values.utilities && values.appliances && values.finishes && (
                  <Grid item xs={12} paddingX={2}>
                    <Paper
                      sx={{ width: "100%", borderRadius: "20px" }}
                      elevation={4}
                    >
                      <Grid container item xs={12} paddingY={2} paddingX={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h4"
                            color={theme.palette.secondary.main}
                          >
                            Dotari apartament
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
                          rowSpacing={2}
                        >
                          <Grid item container xs={12} spacing={2}>
                            <Grid item xs={2}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    value={values.cooling}
                                    defaultChecked={values.cooling}
                                    color="secondary"
                                  />
                                }
                                label="Aer conditionat"
                                name="cooling"
                                labelPlacement="start"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    value={
                                      values.utilities[
                                        "Curent, Apa, Canalizare, Gaz"
                                      ]
                                    }
                                    defaultChecked={
                                      values.utilities[
                                        "Curent, Apa, Canalizare, Gaz"
                                      ]
                                    }
                                    color="secondary"
                                  />
                                }
                                label="Curent, Apa, Canalizare, Gaz"
                                name={`utilities.Curent, Apa, Canalizare, Gaz`}
                                labelPlacement="start"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    value={values.utilities["CATV"]}
                                    defaultChecked={values.utilities["CATV"]}
                                    color="secondary"
                                  />
                                }
                                label="CATV"
                                name={`utilities.CATV`}
                                labelPlacement="start"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    value={
                                      values.utilities["Incalizre pardoseala"]
                                    }
                                    defaultChecked={
                                      values.utilities["Incalizre pardoseala"]
                                    }
                                    color="secondary"
                                  />
                                }
                                label="Incalizre pardoseala"
                                name={`utilities.Incalizre pardoseala`}
                                labelPlacement="start"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    value={
                                      values.utilities["Internet Wireless"]
                                    }
                                    defaultChecked={
                                      values.utilities["IInternet Wireless"]
                                    }
                                    color="secondary"
                                  />
                                }
                                label="Internet Wireless"
                                name={`utilities.Internet Wireless`}
                                labelPlacement="start"
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )}
                <Grid item container xs={12} justifyContent="end">
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      fullWidth
                      disabled={_.isEqual(initialValues, values)}
                    >
                      Salveaza schimbarile
                    </Button>
                  </Grid>
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
