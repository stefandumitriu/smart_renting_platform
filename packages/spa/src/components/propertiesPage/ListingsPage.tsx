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
import React, { useCallback, useMemo, useState } from "react";
import { Listing } from "@packages/api/models/listings/listing";
import { Link, useLoaderData } from "react-router-dom";

const ListingsPage: React.FC<{}> = () => {
  const listings = useLoaderData() as Listing[];
  const [page, setPage] = useState<number>(1);

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

  return (
    <Layout>
      <Grid item>
        <Grid item container>
          {displayedListings.map((listing) => {
            return (
              <Grid item container xs={12} justifyContent="left" my={2}>
                <Grid item xs={8} marginLeft={20}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`${listing.id}`.toString()}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <CardMedia
                            component="img"
                            image="https://i.pinimg.com/originals/30/45/12/304512deb5caefbf2857c01acb5d5e56.jpg"
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
            );
          })}
          <Grid item mx="auto" my={2}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ListingsPage;
