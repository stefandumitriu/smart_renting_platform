import {
  Button,
  Fade,
  Grid,
  Modal,
  Paper,
  Rating,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { ApartmentReview } from "@packages/api/models";
import { Link } from "react-router-dom";

interface ApartmentModalProps {
  open: boolean;
  handleClose: () => void;
  apartmentReviews: ApartmentReview[];
  apartmentId: string;
}

const ApartmentModal: React.FC<ApartmentModalProps> = ({
  open,
  handleClose,
  apartmentReviews,
  apartmentId,
}) => {
  const theme = useTheme();
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${theme.palette.primary.main}`,
    },
    "& .MuiRating-iconHover": {
      color: `${theme.palette.primary.main}`,
    },
  });

  const { qualityScore, comfortScore, locationScore } = useMemo(() => {
    return apartmentReviews.reduce(
      (acc, review) => {
        acc.qualityScore += review.qualityRating / apartmentReviews.length;
        acc.comfortScore += review.comfortRating / apartmentReviews.length;
        acc.locationScore += review.locationRating / apartmentReviews.length;
        return acc;
      },
      { qualityScore: 0, comfortScore: 0, locationScore: 0 }
    );
  }, [apartmentReviews]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Paper elevation={24}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            paddingX={4}
            paddingY={2}
            sx={{
              position: "absolute",
              backgroundColor: "white",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "50%",
              height: "fit-content",
              borderRadius: "30px",
            }}
          >
            <Grid item container xs={12} rowSpacing={1}>
              <Grid item container xs={12} marginTop={2}>
                <Grid item>
                  <Typography color={theme.palette.secondary.main} variant="h4">
                    Scor apartament
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Typography>Scor calitate</Typography>
                </Grid>
                <Grid item>
                  <StyledRating
                    defaultValue={2.5}
                    value={qualityScore}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Typography>Scor comfort</Typography>
                </Grid>
                <Grid item>
                  <StyledRating
                    defaultValue={2.5}
                    value={comfortScore}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Typography>Scor locatie</Typography>
                </Grid>
                <Grid item>
                  <StyledRating
                    defaultValue={2.5}
                    value={locationScore}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <Link to={`/apartments/${apartmentId}/reviews`}>
                  <Button
                    color="primary"
                    onClick={() => console.log("Review clicked")}
                    variant="contained"
                    sx={{ borderRadius: "10px" }}
                  >
                    Vezi recenziile
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ApartmentModal;
