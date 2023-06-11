import React, { useCallback, useContext } from "react";
import {
  Button,
  Divider,
  Fade,
  Grid,
  Modal,
  Paper,
  Rating,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { AuthContext } from "../../../contexts/AuthContext";
import { NewApartmentReview } from "@packages/api/models";
import { CreateApartmentReviewRequest } from "../../../requests/ReviewsRequests";
import { Contract } from "@packages/api/models/contract";
import { StyledTextField } from "../../landingPage/SignupForm";
import { Info } from "@mui/icons-material";

interface CreateApartmentReviewModalProps {
  open: boolean;
  handleClose: () => void;
  contract: Contract;
}

const CreateApartmentReviewModal: React.FC<CreateApartmentReviewModalProps> = ({
  open,
  handleClose,
  contract,
}) => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const submitCallback = useCallback(
    async (values: NewApartmentReview) => {
      const apartmentReview = await CreateApartmentReviewRequest(values);
      console.log(apartmentReview);
      handleClose();
    },
    [handleClose]
  );
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${theme.palette.primary.main}`,
    },
    "& .MuiRating-iconHover": {
      color: `${theme.palette.primary.main}`,
    },
  });
  return currentUser ? (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Paper elevation={24}>
          <Formik
            initialValues={
              {
                reviewerId: currentUser.id,
                apartmentId: contract.apartmentId,
                comfortRating: 0,
                locationRating: 0,
                qualityRating: 0,
              } as NewApartmentReview
            }
            onSubmit={submitCallback}
          >
            {({ values, handleChange, setFieldValue }) => {
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
                          Recenzie - Apartament
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} marginTop={-2}>
                      <Divider
                        flexItem
                        sx={{
                          backgroundColor: `${theme.palette.secondary.main}`,
                          borderBottomWidth: 2,
                        }}
                      />
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                      <Grid item xs={12} md="auto">
                        <Typography
                          fontWeight="bold"
                          color={theme.palette.secondary.main}
                        >
                          Scor comfort
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto">
                        <StyledRating
                          name="comfortRating"
                          value={values.comfortRating}
                          onChange={(event, value) =>
                            setFieldValue("comfortRating", value)
                          }
                        />
                        <Tooltip
                          title="Comfortul general oferit de apartament in functie de dotari, finisaje etc."
                          sx={{ marginLeft: "8px" }}
                        >
                          <Info color="primary" />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                      <Grid item xs={10} md="auto">
                        <Typography
                          fontWeight="bold"
                          color={theme.palette.secondary.main}
                        >
                          Scor locatie
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto" spacing={2}>
                        <StyledRating
                          name="locationRating"
                          value={values.locationRating}
                          onChange={(event, value) =>
                            setFieldValue("locationRating", value)
                          }
                        />
                        <Tooltip
                          title="Infrastructura din zona imobilului + Comportamentul vecinilor"
                          sx={{ marginLeft: "8px" }}
                        >
                          <Info color="primary" />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                      <Grid item xs={12} md="auto">
                        <Typography
                          fontWeight="bold"
                          color={theme.palette.secondary.main}
                        >
                          Scor calitate
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto">
                        <StyledRating
                          name="qualityRating"
                          value={values.qualityRating}
                          onChange={(event, value) =>
                            setFieldValue("qualityRating", value)
                          }
                        />
                        <Tooltip
                          title="Calitatea dotarilor si finisajelor apartamentului"
                          sx={{ marginLeft: "8px" }}
                        >
                          <Info color="primary" />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        name="comment"
                        label={"Informatii"}
                        value={values.comment}
                        onChange={handleChange}
                        multiline
                        fullWidth
                        minRows={2}
                        placeholder={
                          "Adauga detalii si justificari in legatura cu scorurile acordate, precum si alte informatii pe care alti utilizatori ar trebui sa le afle"
                        }
                        color="secondary"
                      />
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
                          Adauga recenzie
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
  ) : (
    <></>
  );
};

export default CreateApartmentReviewModal;
