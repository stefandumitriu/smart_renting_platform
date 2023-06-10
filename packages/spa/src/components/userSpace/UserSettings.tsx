import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../Layout";
import { UpdateUserProfileRequest } from "../../requests/UserSignupRequest";
import { Edit } from "@mui/icons-material";
import { StyledTextField } from "../landingPage/SignupForm";
import { Form, Formik } from "formik";
import { UserProfile } from "@packages/api/models/users/userProfile";
import { FormAutocomplete, FormDatePicker } from "../../FormInputsWrappers";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const employmentStatus = [
  "Angajat",
  "Antreprenor",
  "Student",
  "Pensionar",
  "Somer",
];

const counties = [
  "București",
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brăila",
  "Brașov",
  "Buzău",
  "Caraș-Severin",
  "Călărași",
  "Cluj",
  "Constanța",
  "Covasna",
  "Dâmbovița",
  "Dolj",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Sălaj",
  "Satu Mare",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vâlcea",
  "Vaslui",
  "Vrancea",
];

const UserSettings: React.FC<{}> = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [editNameActive, setEditNameActive] = useState(false);

  const handleEditNameButtonClick = useCallback(() => {
    setEditNameActive(!editNameActive);
  }, [setEditNameActive, editNameActive]);

  const handleSubmit = useCallback(
    async (values: UserProfile) => {
      const updatedUserProfile = await UpdateUserProfileRequest(
        values.id,
        _.omit(values, "id")
      );
      console.log(updatedUserProfile);
      setCurrentUser(updatedUserProfile);
      navigate("/user/dashboard");
    },
    [setCurrentUser, navigate]
  );

  return currentUser ? (
    <Layout pageTitle="Setari Profil">
      <Formik
        initialValues={{
          ...currentUser,
          dateOfBirth: currentUser.dateOfBirth
            ? moment(currentUser.dateOfBirth as unknown as string)
            : undefined,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, initialValues }) => {
          return (
            <Form>
              <Grid
                item
                container
                xs={12}
                sx={{ minHeight: "100vh" }}
                justifyContent="center"
                alignContent="start"
              >
                <Grid item container xs={8} my={4} rowSpacing={2}>
                  <Grid item container xs={12} spacing={2}>
                    <Grid item>
                      {values.profilePhotoUrl ? (
                        <Avatar
                          sx={{ height: "150px", width: "150px" }}
                          src={values.profilePhotoUrl}
                        ></Avatar>
                      ) : (
                        <IconButton
                          onClick={() => console.log("Avatar clicked")}
                        >
                          <Avatar
                            sx={{ height: "150px", width: "150px" }}
                          ></Avatar>
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item>
                      <Stack spacing={2}>
                        <Grid container spacing={1}>
                          {editNameActive ? (
                            <>
                              <Grid item>
                                <StyledTextField
                                  name="firstName"
                                  label="First Name"
                                  value={values.firstName}
                                  onChange={handleChange}
                                  color="secondary"
                                />
                              </Grid>
                              <Grid item>
                                <StyledTextField
                                  name="lastName"
                                  label="Last Name"
                                  value={values.lastName}
                                  onChange={handleChange}
                                  color="secondary"
                                />
                              </Grid>
                            </>
                          ) : (
                            <Grid item>
                              <Typography
                                variant="h3"
                                color={theme.palette.secondary.main}
                              >
                                {values.firstName} {values.lastName}
                              </Typography>
                            </Grid>
                          )}

                          <Grid item>
                            <IconButton
                              onClick={handleEditNameButtonClick}
                              color="primary"
                            >
                              <Edit />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Typography
                          color={theme.palette.secondary.main}
                          fontStyle="italic"
                        >
                          {currentUser?.email}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField
                        fullWidth
                        name="phoneNumber"
                        label="Numar telefon"
                        placeholder="Numar telefon"
                        onChange={handleChange}
                        value={values.phoneNumber}
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} sm={4}>
                      <FormDatePicker
                        name="dateOfBirth"
                        value={values.dateOfBirth}
                        maxDate={moment()}
                        label={"Data nasterii"}
                        sx={{
                          "& fieldset": {
                            borderRadius: "10px",
                          },
                          "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: `${theme.palette.secondary.main}`,
                            },
                          "& .Mui-focused fieldset": {
                            color: `${theme.palette.secondary.main}`,
                          },
                          width: "100%",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} sm={4}>
                      <FormAutocomplete<string>
                        name="town"
                        value={values.town}
                        options={counties}
                        label="Judet"
                        sx={{
                          "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: `${theme.palette.secondary.main}`,
                            },
                          "& .Mui-focused": {
                            color: `${theme.palette.secondary.main}`,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} sm={4}>
                      <FormAutocomplete<string>
                        options={employmentStatus}
                        value={values.employmentStatus}
                        name="employmentStatus"
                        label="Status Angajare"
                        sx={{
                          "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: `${theme.palette.secondary.main}`,
                            },
                          "& .Mui-focused": {
                            color: `${theme.palette.secondary.main}`,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField
                        multiline
                        maxRows={4}
                        label="Despre tine"
                        placeholder="Despre tine"
                        name="about"
                        value={values.about}
                        onChange={handleChange}
                        fullWidth
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} sm={4}>
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
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  ) : (
    <Grid item>
      <Typography>Invalid User</Typography>
    </Grid>
  );
};

export default UserSettings;
