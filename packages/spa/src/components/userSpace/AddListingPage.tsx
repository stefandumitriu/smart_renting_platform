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
import { FormAutocomplete, FormTextInput } from "../../FormInputsWrappers";
import { AuthContext } from "../../contexts/AuthContext";
import { Apartment } from "@packages/api/models/listings/apartment";
import { GetApartmentsByOwnerIdRequest } from "../../requests/ApartmentsRequests";
import Dropzone from "react-dropzone";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { NewListingSchema } from "../../validators/listing";

enum ApartmentStatus {
  UnderReview = "Under Review",
  Available = "Available",
  Listed = "Listed",
  Rented = "Rented",
}

const rentalPeriods = ["1 an", "> 1 an", "6 luni", "3 luni"];

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
  flexDirection: "column",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const deleteButton = {
  backgroundColor: "red",
  minHeight: 20,
  width: "100%",
  color: "white",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

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
  const [previewFiles, setPreviewFiles] = useState<any[]>([]);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: NewListing) => {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("photos", file));
      Object.keys(_.omit(values, "photos")).forEach((key) =>
        formData.append(key, values[key as keyof NewListing]?.toString() ?? "")
      );
      CreateListingRequest(formData)
        .then((res) => console.log(res))
        .then(() => navigate("/user/dashboard/landlord/listings"));
    },
    [uploadedFiles, navigate]
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

  const thumbs = previewFiles.map((file) => (
    // @ts-ignore
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
      <div style={{ width: "100%" }}>
        <button
          style={deleteButton}
          onClick={() => {
            setPreviewFiles(previewFiles.filter((f) => f.name !== file.name));
            setUploadedFiles(uploadedFiles.filter((f) => f.name !== file.name));
          }}
        >
          X
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      previewFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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
              <Grid item xs={12}>
                <Paper
                  sx={{
                    borderRadius: "20px",
                    width: "100%",
                  }}
                  elevation={10}
                >
                  <Dropzone
                    onDrop={(acceptedFiles: File[]) => {
                      setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
                      setPreviewFiles([
                        ...previewFiles,
                        ...acceptedFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          })
                        ),
                      ]);
                    }}
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
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Paper>
              </Grid>
              {previewFiles.length > 0 && (
                <Grid item xs={12}>
                  {thumbs}
                </Grid>
              )}
              <Grid item container xs={12} justifyContent="end">
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ borderRadius: "10px" }}
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
