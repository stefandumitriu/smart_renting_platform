import {
  Avatar,
  Button,
  Divider,
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
import { deepOrange } from "@mui/material/colors";
import { UserProfile } from "@packages/api/models/users/userProfile";
import { Email, Phone } from "@mui/icons-material";
import { UserReview } from "@packages/api/models";
import { Link } from "react-router-dom";

interface OwnerProfileModalProps {
  open: boolean;
  handleClose: () => void;
  owner: UserProfile;
  ownerReviews?: UserReview[];
}

const OwnerProfileModal: React.FC<OwnerProfileModalProps> = ({
  open,
  handleClose,
  owner,
  ownerReviews,
}) => {
  const theme = useTheme();
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${theme.palette.secondary.main}`,
    },
    "& .MuiRating-iconHover": {
      color: `${theme.palette.secondary.main}`,
    },
  });
  const ownerName = useMemo(() => {
    return `${owner.firstName} ${owner.lastName}`;
  }, [owner]);

  const { fairnessScore, communicationScore, availabilityScore } =
    useMemo(() => {
      if (ownerReviews) {
        return ownerReviews.reduce(
          (acc, review) => {
            acc.fairnessScore += review.fairnessRating / ownerReviews.length;
            acc.communicationScore +=
              review.communicationRating / ownerReviews.length;
            acc.availabilityScore +=
              review.availabilityRating / ownerReviews.length;
            return acc;
          },
          { fairnessScore: 0, communicationScore: 0, availabilityScore: 0 }
        );
      }
      return { fairnessScore: 0, communicationScore: 0, availabilityScore: 0 };
    }, [ownerReviews]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Paper elevation={24}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            paddingX={4}
            sx={{
              position: "absolute",
              backgroundColor: "white",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "50%",
              height: "fit-content",
              minHeight: "80%",
            }}
          >
            <Grid
              item
              container
              justifyContent="center"
              alignContent="center"
              sx={{ height: "100%" }}
            >
              <Grid item container xs={12} justifyContent="center">
                <Grid item xs={4}>
                  {owner.profilePhotoUrl ? (
                    <Avatar
                      sx={{
                        marginX: "auto",
                      }}
                      src={owner.profilePhotoUrl}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        marginX: "auto",
                      }}
                    >
                      {ownerName.split(" ")[0][0]}
                      {ownerName.split(" ")[1][0]}
                    </Avatar>
                  )}
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                justifyContent="center"
                marginTop={1}
              >
                <Grid item xs={4} textAlign="center">
                  <Typography>{ownerName}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                justifyContent="center"
                marginTop={1}
              >
                <Grid item container xs={4} justifyContent="center">
                  <Grid item xs={12}>
                    <Typography
                      fontWeight="bolder"
                      color={theme.palette.secondary.main}
                      textAlign="center"
                    >
                      Rating
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      fontWeight="bold"
                      color={theme.palette.secondary.main}
                      textAlign="center"
                    >
                      {(
                        (fairnessScore +
                          communicationScore +
                          availabilityScore) /
                        3
                      ).toPrecision(2)}{" "}
                      / 5
                    </Typography>
                  </Grid>
                  <Grid item container xs={12} justifyContent="center">
                    <Grid item>
                      <StyledRating
                        defaultValue={2.5}
                        value={
                          (fairnessScore +
                            communicationScore +
                            availabilityScore) /
                          3
                        }
                        precision={0.5}
                        size="large"
                        readOnly
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} rowSpacing={1}>
              <Grid item container xs={12}>
                <Grid item>
                  <Typography color={theme.palette.secondary.main} variant="h4">
                    Despre
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item>
                  <Typography>{owner.about}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  sx={{
                    backgroundColor: `${theme.palette.secondary.main}`,
                    borderBottomWidth: 2,
                  }}
                />
              </Grid>
              <Grid item container xs={12} marginTop={2}>
                <Grid item>
                  <Typography color={theme.palette.secondary.main} variant="h4">
                    Contact
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={1}>
                <Grid item>
                  <Phone color="primary" />
                </Grid>
                <Grid item>
                  <Typography>{owner.phoneNumber}</Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={1}>
                <Grid item>
                  <Email color="primary" />
                </Grid>
                <Grid item>
                  <Typography>{owner.email}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  sx={{
                    backgroundColor: `${theme.palette.secondary.main}`,
                    borderBottomWidth: 2,
                  }}
                />
              </Grid>
              <Grid item container xs={12} marginTop={2}>
                <Grid item>
                  <Typography color={theme.palette.secondary.main} variant="h4">
                    Scor utilizator
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Typography>Scor corectitudine</Typography>
                </Grid>
                <Grid item>
                  <StyledRating
                    defaultValue={2.5}
                    value={fairnessScore}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Typography>Scor comunicare</Typography>
                </Grid>
                <Grid item>
                  <StyledRating
                    defaultValue={2.5}
                    value={communicationScore}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Typography>Scor disponibilitate</Typography>
                </Grid>
                <Grid item>
                  <StyledRating
                    defaultValue={2.5}
                    value={availabilityScore}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <Link to={`/user/dashboard/landlord/${owner.id}/reviews`}>
                  <Button
                    color="secondary"
                    onClick={() => console.log("Review clicked")}
                    variant="contained"
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

export default OwnerProfileModal;
