import { Listing } from "@packages/api/models/listings/listing";
import Layout from "../Layout";
import {
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { userListingsLoader } from "../../loaders/UserListingsLoader";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserProfile } from "@packages/api/models/users/userProfile";
import { Link } from "react-router-dom";

const UserFavouriteListings: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const [listings, setListings] = useState<Listing[] | undefined>(undefined);
  const [page, setPage] = useState(1);

  const fetchFn = useCallback(async () => {
    return userListingsLoader((currentUser as UserProfile).id);
  }, [currentUser]);

  useEffect(() => {
    fetchFn().then((data) => {
      console.log(data);
      setListings(data);
    });
  }, [fetchFn]);

  const pageCount = useMemo(() => {
    return listings ? Math.ceil(listings.length / 20) : 0;
  }, [listings]);

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, p: number) => {
      setPage(p);
      window.scrollTo(0, 0);
    },
    [setPage]
  );

  return (
    <Layout pageTitle="Anunturi Favorite">
      <Grid item container xs={12} minHeight={"100vh"}>
        <Grid item container xs={12} justifyContent="center">
          <Grid
            item
            container
            xs={8}
            alignContent="flex-start"
            justifyContent="center"
          >
            {listings && listings.length > 0 ? (
              listings.map((listing) => (
                <Grid item container xs={12} justifyContent="center" my={2}>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        borderRadius: "12px",
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        to={`/properties/${listing.id}`.toString()}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <CardMedia
                              component="img"
                              image={
                                listing.photosUrl &&
                                listing.photosUrl.length > 0
                                  ? listing.photosUrl[0]
                                  : "https://i.pinimg.com/originals/30/45/12/304512deb5caefbf2857c01acb5d5e56.jpg"
                              }
                            />
                          </Grid>
                          <Grid item xs={8} my={4}>
                            <Grid item container sx={{ height: "100%" }}>
                              <Grid item xs={12}>
                                <Typography fontWeight="bolder">
                                  {listing.title}
                                </Typography>
                              </Grid>
                              <Grid item container xs={12}>
                                <Grid item xs={2}>
                                  <Chip
                                    label={
                                      listing.apartment.surface.toString(10) +
                                      " m2"
                                    }
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <Chip
                                    label={
                                      listing.apartment.noOfRooms === 1
                                        ? "o camera"
                                        : listing.apartment.noOfRooms.toString() +
                                          " camere"
                                    }
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <Chip label={listing.apartment.subdivision} />
                                </Grid>
                              </Grid>
                              <Grid item xs={12} alignSelf="flex-end">
                                <Typography fontWeight="bolder">
                                  {listing.price}€ / luna
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography>Nu ai niciun anunt favorit</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
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

export default UserFavouriteListings;
