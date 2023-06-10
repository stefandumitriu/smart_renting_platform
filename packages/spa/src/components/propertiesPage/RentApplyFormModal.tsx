import { Listing } from "@packages/api/models/listings/listing";
import React, { useCallback, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
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
import { CreateApplicationRequest } from "../../requests/ListingsRequests";
import { StyledTextField } from "../landingPage/SignupForm";

interface RentApplyFormModalProps {
  open: boolean;
  listing: Listing;
  handleClose: () => void;
  setHasAppliedForListing: () => void;
}

const RentApplyFormModal: React.FC<RentApplyFormModalProps> = ({
  open,
  listing,
  handleClose,
  setHasAppliedForListing,
}) => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);

  const submitCallback = useCallback(
    async (values: { additionalInfo?: string }) => {
      if (!currentUser) {
        console.log("Please log in");
        return;
      }
      const createdApplication = await CreateApplicationRequest(
        listing.id,
        currentUser.id,
        listing.apartment.owner.id,
        values.additionalInfo
      );
      console.log(createdApplication);
      setHasAppliedForListing();
      handleClose();
    },
    [listing, currentUser, handleClose, setHasAppliedForListing]
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Paper elevation={24}>
          <Formik
            initialValues={{ additionalInfo: undefined }}
            onSubmit={submitCallback}
          >
            {({ values, handleChange }) => {
              return (
                <Form>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    paddingX={4}
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
                          Intreaba proprietarul
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                      <Grid item xs={12}>
                        <StyledTextField
                          name="additionalInfo"
                          onChange={handleChange}
                          multiline
                          fullWidth
                          rows={4}
                          value={values.additionalInfo}
                          color="secondary"
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                      <Grid item>
                        <Typography>
                          Asigura-te ca ai o descriere sugestiva pe profilul
                          tau. Proprietarul va vrea cel mai probabil sa afle mai
                          multe despre tine!
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Aplica
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

export default RentApplyFormModal;
