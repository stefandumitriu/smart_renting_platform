import {
  Avatar,
  Button,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../Layout";
import { UpdateUserProfileRequest } from "../../requests/UserSignupRequest";
import {
  AddCircleOutline,
  Apartment,
  ContentPaste,
  Edit,
  List as ListIcon,
  ExpandLess,
  ExpandMore,
  Favorite,
  FormatListBulleted,
  Person,
  PlaylistAdd,
  Business,
  ChatBubble,
  Logout,
} from "@mui/icons-material";
import { StyledTextField } from "../landingPage/SignupForm";
import { Form, Formik } from "formik";
import { UserProfile } from "@packages/api/models/users/userProfile";
import { FormAutocomplete, FormDatePicker } from "../../FormInputsWrappers";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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

const MenuList: React.FC = () => {
  const [tenantDashboardOpen, setTenantDashboardOpen] = useState(true);
  const [ownerDashboardOpen, setOwnerDashboardOpen] = useState(true);
  const theme = useTheme();
  const naviagte = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const { logout } = useAuth0();
  const logoutHandler = useCallback(() => {
    logout();
    setCurrentUser(undefined);
    naviagte("/");
  }, [setCurrentUser]);
  return (
    <Paper
      elevation={10}
      sx={{
        height: "fit-content",
        padding: "16px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            <Typography fontWeight="bold" color={theme.palette.primary.main}>
              Meniu utilizator
            </Typography>
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => setTenantDashboardOpen(!tenantDashboardOpen)}
          sx={{ borderRadius: "10px" }}
        >
          <ListItemIcon>
            <Person color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard chirias" />
          {tenantDashboardOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={tenantDashboardOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() =>
                naviagte("/user/dashboard/tenant/favourite-listings")
              }
            >
              <ListItemIcon>
                <Favorite color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Anunturi favorite" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() =>
                naviagte("/user/dashboard/tenant/rent-applications")
              }
            >
              <ListItemIcon>
                <FormatListBulleted color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Cererile mele de chirie" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() => naviagte("/user/dashboard/tenant/contract")}
            >
              <ListItemIcon>
                <ContentPaste color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Contract curent" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          onClick={() => setOwnerDashboardOpen(!ownerDashboardOpen)}
          sx={{ borderRadius: "10px" }}
        >
          <ListItemIcon>
            <Business color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard proprietar" />
          {ownerDashboardOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={ownerDashboardOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() => naviagte("/apartments/create-apartment-wizard")}
            >
              <ListItemIcon>
                <AddCircleOutline color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Adauga apartament" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() => naviagte("/user/dashboard/landlord/apartments")}
            >
              <ListItemIcon>
                <Apartment color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Apartamentele mele" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() =>
                naviagte("/user/dashboard/landlord/listings/create")
              }
            >
              <ListItemIcon>
                <PlaylistAdd color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Adauga anunt" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, borderRadius: "10px" }}
              onClick={() => naviagte("/user/dashboard/landlord/listings")}
            >
              <ListItemIcon>
                <ListIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Anunturile mele" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          onClick={() => naviagte("/chat")}
          sx={{ borderRadius: "10px" }}
        >
          <ListItemIcon>
            <ChatBubble color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Mesajele mele" />
        </ListItemButton>
        <ListItemButton onClick={logoutHandler} sx={{ borderRadius: "10px" }}>
          <ListItemIcon>
            <Logout color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Iesi din cont" />
        </ListItemButton>
      </List>
    </Paper>
  );
};

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
      <Grid item container xs={12} my={4}>
        <Grid item xs={12} md={3} paddingLeft={4}>
          <Grid item container xs={12}>
            <MenuList />
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} mx={4}>
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
                    alignContent="start"
                  >
                    <Grid item container xs={8} rowSpacing={2}>
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
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
        </Grid>
      </Grid>
    </Layout>
  ) : (
    <Grid item>
      <Typography>Invalid User</Typography>
    </Grid>
  );
};

export default UserSettings;
