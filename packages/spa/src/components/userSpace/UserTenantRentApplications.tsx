import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Layout from "../Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { Application } from "@packages/api/models/listings/application";
import {
  DeleteApplicationRequest,
  GetTenantApplicationsRequest,
} from "../../requests/ListingsRequests";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Paper,
  Rating,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import OwnerProfileModal from "../propertiesPage/OwnerProfileModal";
import { UserReview } from "@packages/api/models";
import { GetLandlordUserReviewsRequest } from "../../requests/ReviewsRequests";
import { Link } from "react-router-dom";

interface TenantRentApplicationCardProps {
  application: Application;
  handleDelete: (id: string) => void;
}

const RentApplicationCard: React.FC<TenantRentApplicationCardProps> = ({
  application,
  handleDelete,
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
  const [ownerProfileOpen, setOwnerProfileOpen] = useState(false);
  const [ownerReviews, setOwnerReviews] = useState<UserReview[]>([]);
  const handleOwnerProfileClose = useCallback(() => {
    setOwnerProfileOpen(false);
  }, []);

  const ownerRating = useMemo(() => {
    return ownerReviews.reduce((acc, review) => {
      acc +=
        (review.fairnessRating +
          review.communicationRating +
          review.availabilityRating) /
        (ownerReviews.length * 3);
      return acc;
    }, 0);
  }, [ownerReviews]);

  useEffect(() => {
    GetLandlordUserReviewsRequest(application.landlordId).then((res) =>
      setOwnerReviews(res)
    );
  }, []);

  return (
    <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={4}>
      <Grid container>
        <Grid item xs={6}>
          <Card
            sx={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              height: "100%",
            }}
          >
            <CardActionArea
              href={`/properties/${application.listing.id}`}
              sx={{ height: "100%" }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Grid container rowSpacing={2} sx={{ height: "100%" }}>
                  <Grid item container xs={12} justifyContent="center">
                    <Grid item>
                      <Typography
                        color={theme.palette.secondary.main}
                        variant="h5"
                      >
                        Apartament
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="flex-start">
                    <Grid item>
                      <Typography>{application.listing.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={2}>
                      <Chip
                        label={
                          application.listing.apartment.surface.toString(10) +
                          " m2"
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Chip
                        label={
                          application.listing.apartment.noOfRooms === 1
                            ? "o camera"
                            : application.listing.apartment.noOfRooms.toString() +
                              " camere"
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Chip label={application.listing.apartment.subdivision} />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="flex-end">
                    <Grid item>
                      <Typography
                        color={theme.palette.secondary.main}
                        fontWeight="bolder"
                      >
                        {application.listing.price} € / luna
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minHeight: "100%" }}>
            <CardActionArea onClick={() => setOwnerProfileOpen(true)}>
              <CardContent>
                <Grid container rowSpacing={2}>
                  <Grid item container xs={12} justifyContent="center">
                    <Grid item>
                      <Typography
                        color={theme.palette.secondary.main}
                        variant="h5"
                      >
                        Proprietar
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="center">
                    <Grid item>
                      <Avatar
                        src={
                          application.listing.apartment.owner.profilePhotoUrl
                        }
                      />
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
                      <Typography>
                        {application.listing.apartment.owner.firstName}{" "}
                        {application.listing.apartment.owner.lastName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="center">
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
                      <Grid item container xs={12} justifyContent="center">
                        <Grid item>
                          <StyledRating
                            defaultValue={2.5}
                            value={ownerRating}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2} sx={{ minHeight: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            sx={{ height: "100%", width: "100%" }}
            alignContent="center"
          >
            <Grid item>
              <Link
                to={"/chat"}
                state={{
                  initialConversationUserId:
                    application.listing.apartment.ownerId,
                }}
              >
                <Button
                  color="info"
                  variant="contained"
                  sx={{ borderRadius: "10px" }}
                  fullWidth
                >
                  Mesaj
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                sx={{ borderRadius: "10px" }}
                fullWidth
                onClick={() => handleDelete(application.id)}
              >
                Renunta
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OwnerProfileModal
        open={ownerProfileOpen}
        handleClose={handleOwnerProfileClose}
        owner={application.listing.apartment.owner}
        ownerReviews={ownerReviews}
      />
    </Paper>
  );
};

const UserTenantRentApplications: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);

  const [rentApplications, setRentApplications] = useState<
    Application[] | undefined
  >(undefined);
  const fetchTenantApplicationsFn = useCallback(async () => {
    if (!currentUser) {
      return undefined;
    }
    return GetTenantApplicationsRequest(currentUser.id);
  }, [currentUser]);
  useEffect(() => {
    fetchTenantApplicationsFn().then((data) => setRentApplications(data));
  }, [fetchTenantApplicationsFn]);

  const handleDeleteApplicationButton = useCallback(
    async (id: string) => {
      const deleteStatus = await DeleteApplicationRequest(id);
      if (deleteStatus === 204) {
        setRentApplications(rentApplications?.filter((a) => a.id !== id));
      }
    },
    [rentApplications, setRentApplications]
  );

  return (
    <Layout pageTitle="Cereri de inchiriere">
      <Grid
        item
        container
        xs={12}
        rowSpacing={4}
        sx={{ minHeight: "100vh" }}
        alignContent="flex-start"
        my={2}
      >
        {rentApplications?.map((application) => (
          <Grid item xs={12} paddingX={2}>
            <RentApplicationCard
              application={application}
              handleDelete={handleDeleteApplicationButton}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default UserTenantRentApplications;
