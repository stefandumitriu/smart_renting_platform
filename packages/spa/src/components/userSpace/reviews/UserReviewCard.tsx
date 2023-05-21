import React from "react";
import {
  Avatar,
  Divider,
  Grid,
  Paper,
  Rating,
  styled,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "moment/moment";
import { UserReview } from "@packages/api/models";

interface ReviewProps {
  review: UserReview;
}

const UserReviewCard: React.FC<ReviewProps> = ({ review }: ReviewProps) => {
  const theme = useTheme();
  const largeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${theme.palette.secondary.main}`,
    },
    "& .MuiRating-iconHover": {
      color: `${theme.palette.secondary.main}`,
    },
  });
  return (
    <Paper elevation={8}>
      <Grid container padding={4} alignContent="center">
        <Grid
          item
          container
          xs={12}
          sm={3}
          columnSpacing={2}
          alignItems="center"
        >
          <Grid item xs="auto" sm={12}>
            <Avatar
              src={
                review.reviewer.profilePhotoUrl ||
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AProfile_avatar_placeholder_large.png&psig=AOvVaw3g8UGAKNOxuU_4r-3pVqwN&ust=1683649237783000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNDKwaeQ5v4CFQAAAAAdAAAAABAE"
              }
              sx={{ width: 64, height: 64 }}
            />
          </Grid>
          <Grid item xs="auto" md={12}>
            <Typography fontWeight="bold" color={theme.palette.secondary.main}>
              {review.reviewer.firstName} {review.reviewer.lastName}
            </Typography>
          </Grid>
          <Grid item xs="auto" md={12}>
            <Typography>
              {moment(review.created_at).format("DD MMM YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm="auto" marginY={largeScreen ? 0 : 2}>
          <Divider
            orientation={largeScreen ? "vertical" : "horizontal"}
            sx={{ marginRight: largeScreen ? "8px" : "0px" }}
          />
        </Grid>
        <Grid container item xs={12} sm={7} flexDirection="column">
          <Grid item container columnSpacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography>
                <Typography
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
                >
                  Scor corectitudine
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <StyledRating readOnly value={review.fairnessRating} />
            </Grid>
          </Grid>
          <Grid item container columnSpacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography>
                <Typography
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
                >
                  Scor comunicare
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <StyledRating readOnly value={review.communicationRating} />
            </Grid>
          </Grid>
          <Grid item container columnSpacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography>
                <Typography
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
                >
                  Scor disponibilitate
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <StyledRating readOnly value={review.availabilityRating} />
            </Grid>
          </Grid>
          <Grid item>
            <Typography>{review.comment}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserReviewCard;
