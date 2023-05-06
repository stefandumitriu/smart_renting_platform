import { Listing } from "@packages/api/models/listings/listing";
import Layout from "../Layout";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Pagination,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DeleteListingRequest,
  GetUserListingsRequest,
} from "../../requests/ListingsRequests";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface LandlordListingCardProps {
  listing: Listing;
  handleDelete: (id: string) => void;
}

const LandlordListingCard: React.FC<LandlordListingCardProps> = ({
  listing,
  handleDelete,
}) => {
  const theme = useTheme();
  return (
    <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={4}>
      <Grid container>
        <Grid item xs={5}>
          <Card
            sx={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              height: "100%",
            }}
          >
            <CardActionArea
              href={`/properties/${listing.id}`}
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
                        Anunt
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="flex-start">
                    <Grid item>
                      <Typography>{listing.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="flex-end">
                    <Grid item>
                      <Typography
                        color={theme.palette.secondary.main}
                        fontWeight="bolder"
                      >
                        {listing.price} € / luna
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            sx={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              height: "100%",
            }}
          >
            <CardActionArea
              href={`/apartments/${listing.apartmentId}`}
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
                      <Typography>
                        {listing.apartment.address.streetType}{" "}
                        {listing.apartment.address.streetName}
                        {", "}
                        Nr. {listing.apartment.address.streetNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={2}>
                      <Chip
                        label={listing.apartment.surface.toString(10) + " m2"}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Chip
                        label={
                          listing.apartment.noOfRooms === 1
                            ? "o camera"
                            : listing.apartment.noOfRooms.toString() + " camere"
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Chip label={listing.apartment.subdivision} />
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
              <Link to={`/properties/${listing.id}/applications`}>
                <Button color="info" variant="contained" fullWidth>
                  Vezi cereri
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => handleDelete(listing.id)}
              >
                Editeaza
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                fullWidth
                onClick={() => handleDelete(listing.id)}
              >
                Sterge
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const UserLandlordListingsPage: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState<number>(1);

  const loader = useCallback(async () => {
    if (!currentUser) {
      return [];
    }
    return GetUserListingsRequest(currentUser.id);
  }, [currentUser]);
  useEffect(() => {
    loader().then((data) => setListings(data));
  }, [loader]);

  const displayedListings = useMemo(() => {
    return listings.slice((page - 1) * 20, page * 20);
  }, [page, listings]);

  const pageCount = useMemo(() => {
    return Math.ceil(listings.length / 20);
  }, [listings]);

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, p: number) => {
      setPage(p);
      window.scrollTo(0, 0);
    },
    [setPage]
  );

  const handleDelete = useCallback(async (id: string) => {
    const status = await DeleteListingRequest(id);
    if (status === 204) {
      setListings(listings.filter((l) => l.id !== id));
    } else {
      console.error("Delete listing request failed");
    }
  }, []);

  return (
    <Layout pageTitle="Anunturile mele">
      <Grid
        item
        container
        xs={12}
        rowSpacing={4}
        sx={{ minHeight: "100vh" }}
        alignContent="flex-start"
      >
        {displayedListings?.map((listing) => (
          <Grid item xs={12} paddingX={2}>
            <LandlordListingCard
              listing={listing}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
        {pageCount > 1 && (
          <Grid item mx="auto" my={2}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default UserLandlordListingsPage;
