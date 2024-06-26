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
import { UserReview } from "@packages/api/models";
import { PatchUserReviewRequest } from "../../../requests/ReviewsRequests";
import { StyledTextField } from "../../landingPage/SignupForm";
import { Info } from "@mui/icons-material";
import { omit } from "lodash";

interface UpdateUserReviewModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (userReview: UserReview) => void;
  userReview: UserReview;
}

const UpdateUserReviewModal: React.FC<UpdateUserReviewModalProps> = ({
  open,
  handleClose,
  handleSubmit,
  userReview,
}) => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const submitCallback = useCallback(
    async (values: UserReview) => {
      const updatedUserReview = await PatchUserReviewRequest(
        values.id,
        omit(values, ["id", "reviewer", "user", "created_at"])
      );
      handleSubmit(updatedUserReview);
      handleClose();
    },
    [handleClose, handleSubmit]
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
          <Formik initialValues={userReview} onSubmit={submitCallback}>
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
                          Recenzie -{" "}
                          {userReview.type === "LANDLORD"
                            ? "Proprietar"
                            : "Chirias"}
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
                      <Grid item xs={10} md="auto">
                        <Typography
                          fontWeight="bold"
                          color={theme.palette.secondary.main}
                        >
                          Scor corectitudine
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto">
                        <StyledRating
                          name="fairnessRating"
                          value={values.fairnessRating}
                          onChange={(event, value) =>
                            setFieldValue("fairnessRating", value)
                          }
                        />
                        <Tooltip
                          title="Corectitudinea in respectarea termenilor contractului/Prezentare reala a informatiilor despre apartament"
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
                          Scor comunicare
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto" spacing={2}>
                        <StyledRating
                          name="communicationRating"
                          value={values.communicationRating}
                          onChange={(event, value) =>
                            setFieldValue("communicationRating", value)
                          }
                        />
                        <Tooltip
                          title="Comunicare facila si rapida"
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
                          Scor disponibilitate
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto">
                        <StyledRating
                          name="availabilityRating"
                          value={values.availabilityRating}
                          onChange={(event, value) =>
                            setFieldValue("availabilityRating", value)
                          }
                        />
                        <Tooltip
                          title="Disponibilitatea acestuia de a repara anumite defecte ale imobilului, amabilitate, intelegere"
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
                          Editeaza recenzie
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

export default UpdateUserReviewModal;
