import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { NewListing } from "@packages/api/models/listings/listing";
import { CreateListingRequest } from "../../requests/ListingsRequests";
import { FormAutocomplete } from "../../FormInputsWrappers";
import { AuthContext } from "../../contexts/AuthContext";
import { Apartment } from "@packages/api/models/listings/apartment";
import { GetApartmentsByOwnerIdRequest } from "../../requests/ApartmentsRequests";
import { StyledTextField } from "../landingPage/SignupForm";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

enum ApartmentStatus {
  UnderReview = "Under Review",
  Available = "Available",
  Listed = "Listed",
  Rented = "Rented",
}

const rentalPeriods = ["1 an", "> 1 an", "6 luni", "3 luni"];

const NewListingSchema = Yup.object().shape({
  apartmentId: Yup.string().uuid().required(),
  title: Yup.string().required(),
  price: Yup.number().min(1).required(),
  about: Yup.string(),
  rentalPeriod: Yup.string(),
  availability: Yup.string(),
});

const AddListingPage: React.FC<{}> = () => {
  const theme = useTheme();
  const dropzoneStyle = {
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: "20px",
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    color: theme.palette.secondary.main,
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  const { currentUser } = useContext(AuthContext);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: NewListing) => {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("photos", file));
      Object.keys(_.omit(values, "photos")).forEach((key) =>
        formData.append(key, values[key as keyof NewListing]?.toString() ?? "")
      );
      const listing = await CreateListingRequest(formData);
      console.log(listing);
      navigate("/user/dashboard/landlord/listings");
    },
    [uploadedFiles]
  );

  const fetchApartments = useCallback(async () => {
    if (currentUser) {
      return GetApartmentsByOwnerIdRequest(currentUser.id);
    }
    return [];
  }, [currentUser]);

  useEffect(() => {
    fetchApartments().then((res) => setApartments(res));
  }, [setApartments, fetchApartments]);

  const availableApartments = useMemo(() => {
    return apartments.filter((a) => a.status === ApartmentStatus.Available);
  }, [apartments]);

  const apartmentOptions = useMemo(() => {
    return availableApartments.map((apartment) => ({
      label:
        apartment.address.streetType +
        " " +
        apartment.address.streetName +
        " Nr. " +
        apartment.address.streetNumber +
        " - " +
        apartment.noOfRooms +
        " camere",
      value: apartment.id,
    }));
  }, [availableApartments]);
  return (
    <Layout pageTitle="Adauga anunt">
      <Formik
        initialValues={{} as NewListing}
        onSubmit={handleSubmit}
        validationSchema={NewListingSchema}
      >
        {({ values, handleChange }) => (
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
                        <FormAutocomplete<string>
                          options={apartmentOptions.map(
                            (option) => option.value
                          )}
                          label="Apartament"
                          name="apartmentId"
                          value={values.apartmentId}
                          getOptionLabel={(option) =>
                            apartmentOptions.find((o) => o.value === option)
                              ?.label || ""
                          }
                          onChange={handleChange}
                          fullWidth
                          required
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
                        <StyledTextField
                          name="title"
                          label="Titlu"
                          value={values.title}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <StyledTextField
                          name="price"
                          label="Pret (euro/luna)"
                          value={values.price}
                          onChange={handleChange}
                          type="number"
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} marginTop={2}>
                      <Grid item xs={12}>
                        <StyledTextField
                          name="about"
                          label="Descriere"
                          value={values.about}
                          onChange={handleChange}
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
                        <StyledTextField
                          name="availability"
                          label="Disponibilitate"
                          value={values.availability}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    borderRadius: "20px",
                    width: "100%",
                  }}
                  elevation={10}
                >
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      setUploadedFiles([...uploadedFiles, acceptedFiles[0]])
                    }
                    multiple
                    accept={{ "image/png": [".png"], "image/jpeg": [".jpeg"] }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps({ style: dropzoneStyle })}>
                          <input
                            {...getInputProps()}
                            hidden
                            name="addressProof"
                            type="file"
                          />
                          {uploadedFiles.length > 0 ? (
                            uploadedFiles.map(
                              (uploadedFile) => uploadedFile.name
                            )
                          ) : (
                            <>
                              {" "}
                              <p>
                                Incarcati poze sugestive cu diferite zone ale
                                apartamentului
                              </p>
                              <em>
                                (Doar extensiile *.jpeg si *.png pentru imagini
                                vor fi acceptate)
                              </em>
                            </>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Paper>
              </Grid>
              <Grid item container xs={12} justifyContent="end">
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                  >
                    Salveaza anunt
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

export default AddListingPage;
