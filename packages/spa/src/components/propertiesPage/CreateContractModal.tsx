import {
  Button,
  Fade,
  Grid,
  Modal,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { Application } from "@packages/api/models/listings/application";
import { NewContact } from "@packages/api/models/contract";
import { CreateContractRequest } from "../../requests/ContractsRequest";
import { useNavigate } from "react-router-dom";
import { FormDatePicker, FormTextInput } from "../../FormInputsWrappers";
import { PatchApplicationRequest } from "../../requests/ListingsRequests";
import { PatchApartmentRequest } from "../../requests/ApartmentsRequests";
import { ContractSchema } from "../../validators/contract";

enum ApplicationStatus {
  Waiting = "Waiting",
  Approved = "Approved",
  Rejected = "Rejected",
}

enum ApartmentStatus {
  UnderReview = "Under Review",
  Available = "Available",
  Listed = "Listed",
  Rented = "Rented",
}

interface CreateContractModelProps {
  open: boolean;
  handleClose: () => void;
  application: Application;
}

const CreateContractModal: React.FC<CreateContractModelProps> = ({
  open,
  handleClose,
  application,
}: CreateContractModelProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const submitCallback = useCallback(
    async (values: NewContact) => {
      const contract = await CreateContractRequest(values);
      await PatchApplicationRequest(application.id, {
        status: ApplicationStatus.Approved,
      });
      await PatchApartmentRequest(application.listing.apartmentId, {
        ...application.listing.apartment,
        status: ApartmentStatus.Rented,
      });
      console.log(contract);
      navigate("/user/dashboard/landlord/apartments");
    },
    [navigate, application]
  );
  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Paper elevation={24}>
          <Formik
            initialValues={
              {
                apartmentId: application.listing.apartmentId,
                tenantId: application.tenantId,
                landlordId: application.landlordId,
                price: application.listing.price,
              } as NewContact
            }
            onSubmit={submitCallback}
            validationSchema={ContractSchema}
          >
            {({ values, handleChange }) => {
              return (
                <Form>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    paddingX={4}
                    paddingY={4}
                    rowSpacing={2}
                    sx={{
                      position: "absolute",
                      backgroundColor: "white",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxWidth: "50%",
                      height: "fit-content",
                      minHeight: "40%",
                    }}
                  >
                    <Grid item container xs={12}>
                      <Grid item>
                        <Typography
                          color={theme.palette.secondary.main}
                          variant="h4"
                        >
                          Contract de inchiriere
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} md={5}>
                        <FormDatePicker
                          name="startDate"
                          value={values.startDate}
                          label="Data incepere contract"
                          sx={{
                            "& fieldset": { borderRadius: "10px" },
                            width: "100%",
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormDatePicker
                          name="endDate"
                          value={values.endDate}
                          label="Data finalizare contract"
                          sx={{
                            "& fieldset": { borderRadius: "10px" },
                            width: "100%",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                      <Grid item xs={12} md={6}>
                        <FormTextInput<number>
                          name="depositValue"
                          label="Garantie"
                          fullWidth
                          required
                          type="number"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} md={2}>
                        <FormTextInput<string>
                          name="rentPayday"
                          label="Zi plata chirie"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <FormTextInput<string>
                          name="paymentInfo"
                          label="Informatii plata"
                          placeholder="IBAN/Cash etc."
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormTextInput<string>
                          name="additionalClauses"
                          label="Clauze aditionale"
                          fullWidth
                          multiline
                          maxRows={4}
                          minRows={2}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent="end"
                      paddingRight={4}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ borderRadius: "10px" }}
                        >
                          Creeaza draft contract
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CreateContractModal;
