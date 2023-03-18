import Layout from "../Layout";
import {
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Listing } from "@packages/api/models/listings/listing";
import { Link, useLoaderData } from "react-router-dom";
import { Clear } from "@mui/icons-material";
import { SubdivisonTypeEnum } from "@packages/db/models/listings/apartment";

const ListingsPage: React.FC<{}> = () => {
  const theme = useTheme();
  const listings = useLoaderData() as Listing[];
  const [page, setPage] = useState<number>(1);
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSurface, setMinSurface] = useState(0);
  const [maxSurface, setMaxSurface] = useState(0);
  const [subdivisionType, setSubdivisionType] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNoOfRoomsFilterChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      setNoOfRooms(event.target.value as number);
    },
    [setNoOfRooms]
  );

  const handleMinPriceFilterChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      setMinPrice(event.target.value as number);
    },
    [setMinPrice]
  );

  const handleMaxPriceFilterChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      setMaxPrice(event.target.value as number);
    },
    [setMaxPrice]
  );

  const handleMinSurfaceFilterChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      setMinSurface(event.target.value as number);
    },
    [setMinSurface]
  );

  const handleMaxSurfaceFilterChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      setMaxSurface(event.target.value as number);
    },
    [setMaxSurface]
  );

  const handleSubdivisionTypeFilterChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setSubdivisionType(event.target.value);
    },
    [setSubdivisionType]
  );

  const filteredListing = useMemo(() => {
    return listings
      .filter(
        (listing) =>
          noOfRooms === 0 || listing.apartment.noOfRooms === noOfRooms
      )
      .filter((listing) => minPrice === 0 || listing.price >= minPrice)
      .filter((listing) => maxPrice === 0 || listing.price < maxPrice)
      .filter(
        (listing) => minSurface === 0 || listing.apartment.surface > minSurface
      )
      .filter(
        (listing) => maxSurface === 0 || listing.apartment.surface < maxSurface
      )
      .filter(
        (listing) =>
          !subdivisionType || listing.apartment.subdivision === subdivisionType
      );
  }, [
    listings,
    noOfRooms,
    minPrice,
    maxPrice,
    minSurface,
    maxSurface,
    subdivisionType,
  ]);

  const displayedListings = useMemo(() => {
    return filteredListing.slice((page - 1) * 20, page * 20);
  }, [page, filteredListing]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredListing.length / 20);
  }, [filteredListing]);

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, p: number) => {
      setPage(p);
      window.scrollTo(0, 0);
    },
    [setPage]
  );

  return (
    <Layout>
      <Grid item container xs={12}>
        <Grid item container xs={12}>
          <Grid item container xs={8}>
            {displayedListings.map((listing) => {
              return (
                <Grid item container xs={12} justifyContent="center" my={2}>
                  <Grid item xs={12}>
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
          </Grid>
          <Grid item container xs={4} justifyContent="center" marginTop={2}>
            <Grid item xs={8} marginTop={2}>
              <Paper sx={{ width: "100%" }} elevation={4}>
                <Grid
                  item
                  container
                  xs={12}
                  rowSpacing={2}
                  justifyContent="center"
                  paddingBottom={2}
                >
                  <Grid item xs={12}>
                    <Typography
                      color={theme.palette.secondary.main}
                      textAlign="center"
                      variant="h5"
                    >
                      Filtre
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>Numar camere</Typography>
                  </Grid>
                  <Grid item xs={10} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleNoOfRoomsFilterChange}
                      defaultValue={0}
                      value={noOfRooms}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: noOfRooms ? "" : "none" }}
                          onClick={() => {
                            setNoOfRooms(0);
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                    >
                      <MenuItem value={0}>Oricate</MenuItem>
                      <MenuItem value={1}>O camera</MenuItem>
                      <MenuItem value={2}>2 camere</MenuItem>
                      <MenuItem value={3}>3 camere</MenuItem>
                      <MenuItem value={4}>4 camere</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>Pret</Typography>
                  </Grid>
                  <Grid item sm={10} md={5} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleMinPriceFilterChange}
                      defaultValue={0}
                      value={minPrice}
                      inputProps={{ IconComponent: () => null }}
                      sx={{
                        "&.MuiInputLabel": {
                          color: `${theme.palette.secondary.main}`,
                        },
                      }}
                      endAdornment={
                        <IconButton
                          sx={{ display: minPrice ? "" : "none" }}
                          onClick={() => {
                            setMinPrice(0);
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                    >
                      <MenuItem value={0}>Oricat</MenuItem>
                      <MenuItem value={200}>200€</MenuItem>
                      <MenuItem value={300}>300€</MenuItem>
                      <MenuItem value={400}>400€</MenuItem>
                      <MenuItem value={450}>450€</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item sm={10} md={5} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleMaxPriceFilterChange}
                      defaultValue={0}
                      value={maxPrice}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: maxPrice ? "" : "none" }}
                          onClick={() => {
                            setMaxPrice(0);
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                    >
                      <MenuItem value={0}>Oricat</MenuItem>
                      <MenuItem value={400}>400€</MenuItem>
                      <MenuItem value={500}>500€</MenuItem>
                      <MenuItem value={750}>750€</MenuItem>
                      <MenuItem value={1000}>1000€</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>Suprafata</Typography>
                  </Grid>
                  <Grid item sm={10} md={5} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleMinSurfaceFilterChange}
                      defaultValue={0}
                      value={minSurface}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: minSurface ? "" : "none" }}
                          onClick={() => {
                            setMinSurface(0);
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                    >
                      <MenuItem value={0}>Oricat</MenuItem>
                      <MenuItem value={30}>30mp</MenuItem>
                      <MenuItem value={40}>40mp</MenuItem>
                      <MenuItem value={50}>50mp</MenuItem>
                      <MenuItem value={100}>100mp</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item sm={10} md={5} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleMaxSurfaceFilterChange}
                      defaultValue={0}
                      value={maxSurface}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: maxSurface ? "" : "none" }}
                          onClick={() => {
                            setMaxSurface(0);
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                    >
                      <MenuItem value={0}>Oricat</MenuItem>
                      <MenuItem value={50}>50mp</MenuItem>
                      <MenuItem value={60}>60mp</MenuItem>
                      <MenuItem value={80}>800mp</MenuItem>
                      <MenuItem value={150}>150mp</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>Compartimentare</Typography>
                  </Grid>
                  <Grid item xs={10} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleSubdivisionTypeFilterChange}
                      defaultValue={""}
                      value={subdivisionType}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: subdivisionType ? "" : "none" }}
                          onClick={() => {
                            setSubdivisionType("");
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                    >
                      <MenuItem value={SubdivisonTypeEnum.Decomandat}>
                        {SubdivisonTypeEnum.Decomandat}
                      </MenuItem>
                      <MenuItem value={SubdivisonTypeEnum.Semidecomandat}>
                        {SubdivisonTypeEnum.Semidecomandat}
                      </MenuItem>
                      <MenuItem value={SubdivisonTypeEnum.Nedecomandat}>
                        {SubdivisonTypeEnum.Nedecomandat}
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item mx="auto" my={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ListingsPage;
