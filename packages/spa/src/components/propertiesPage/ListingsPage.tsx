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
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Clear, Star } from "@mui/icons-material";
import neighbourhoods from "../../neighbourhoods.json";
import { ApartmentReview, UserReview } from "@packages/api/models";
import {
  GetAllApartmentReviewsRequest,
  GetAllLandlordReviewsRequest,
} from "../../requests/ReviewsRequests";
import { values } from "lodash";

enum SubdivisonTypeEnum {
  Decomandat = "Decomandat",
  Semidecomandat = "Semidecomandat",
  Nedecomandat = "Nedecomandat",
}

enum SortMethod {
  Price = "Pret",
  Surface = "Suprafata",
  Rooms = "Numar camere",
  ApartmentScore = "Scor apartament",
  OwnerScore = "Scor proprietar",
}

const ListingsPage: React.FC<{}> = () => {
  const theme = useTheme();
  const listings = useLoaderData() as Listing[];
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSurface, setMinSurface] = useState(0);
  const [maxSurface, setMaxSurface] = useState(0);
  const [subdivisionType, setSubdivisionType] = useState("");
  const [landlordReviews, setLandlordReviews] = useState<UserReview[]>([]);
  const [apartmentReviews, setApartmentReviews] = useState<ApartmentReview[]>(
    []
  );

  const [sortMethod, setSortMethod] = useState<string>(
    SortMethod.ApartmentScore
  );

  const getApartmentScore = useCallback(
    (apartmentId: string) => {
      return apartmentReviews
        .filter((a) => a.apartmentId === apartmentId)
        .reduce((acc, review, _, arr) => {
          acc +=
            (review.comfortRating +
              review.qualityRating +
              review.locationRating) /
            (arr.length * 3);
          return acc;
        }, 0);
    },
    [apartmentReviews]
  );

  const getOwnerScore = useCallback(
    (ownerId: string) => {
      return landlordReviews
        .filter((a) => a.userId === ownerId)
        .reduce((acc, review, _, arr) => {
          acc +=
            (review.fairnessRating +
              review.communicationRating +
              review.availabilityRating) /
            (arr.length * 3);
          return acc;
        }, 0);
    },
    [landlordReviews]
  );

  const sortFn = useCallback(
    (listingA: Listing, listingB: Listing) => {
      switch (sortMethod) {
        case undefined:
          return 0;
        case SortMethod.Price:
          return listingA.price - listingB.price;
        case SortMethod.Surface:
          return listingA.apartment.surface - listingB.apartment.surface;
        case SortMethod.Rooms:
          return listingA.apartment.noOfRooms - listingB.apartment.noOfRooms;
        case SortMethod.OwnerScore:
          return (
            getOwnerScore(listingB.apartment.ownerId) -
            getOwnerScore(listingA.apartment.ownerId)
          );
        case SortMethod.ApartmentScore:
          return (
            getApartmentScore(listingB.apartmentId) -
            getApartmentScore(listingA.apartmentId)
          );
        default:
          return 0;
      }
    },
    [sortMethod, getOwnerScore, getApartmentScore]
  );

  const [area, setArea] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
    GetAllLandlordReviewsRequest().then((res) => setLandlordReviews(res));
    GetAllApartmentReviewsRequest().then((res) => setApartmentReviews(res));
  }, []);

  useEffect(() => {
    setArea(searchParams.get("area") ?? "");
  }, [searchParams]);

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

  const handleAreaFilterChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setArea(event.target.value);
    },
    [setArea]
  );

  const images: string[] = [
    "https://i.pinimg.com/originals/30/45/12/304512deb5caefbf2857c01acb5d5e56.jpg",
    "https://www.franklinsapartments.com/img/Apt5a.jpg",
    "https://www.franklinsapartments.com/img/Apt6c.jpg",
    "https://riceandroman.azureedge.net/prop-1464/1464-1.jpg",
  ];

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
      )
      .filter((listing) => {
        if (!area) {
          return true;
        }
        const bounds = neighbourhoods.find((n) => n.neighbourhood === area);
        if (!bounds) {
          return true;
        }
        const lat = listing.apartment.address.lat;
        const long = listing.apartment.address.long;
        return (
          lat &&
          long &&
          lat > bounds.southwest.lat &&
          lat < bounds.northeast.lat &&
          long > bounds.southwest.long &&
          long < bounds.northeast.long
        );
      })
      .sort(sortFn);
  }, [
    listings,
    noOfRooms,
    minPrice,
    maxPrice,
    minSurface,
    maxSurface,
    subdivisionType,
    area,
    sortFn,
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
    <Layout pageTitle="Lista proprietati">
      <Grid item container xs={12} sx={{ minHeight: "100vh" }}>
        <Grid item container xs={12} marginTop={2}>
          <Grid
            item
            container
            xs={12}
            md={8}
            alignContent="flex-start"
            sx={{
              [theme.breakpoints.down("md")]: {
                order: 2,
              },
              [theme.breakpoints.up("md")]: {
                order: 1,
              },
            }}
          >
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
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            [theme.breakpoints.down("md")]: {
                              flexDirection: "column",
                            },
                            [theme.breakpoints.up("md")]: {
                              flexDirection: "row",
                            },
                          }}
                        >
                          <Grid item xs={12} md={4}>
                            <CardMedia
                              component="img"
                              image={
                                listing.photosUrl &&
                                listing.photosUrl.length > 0
                                  ? listing.photosUrl[0]
                                  : images[Math.floor(Math.random() * 3.99)]
                              }
                              sx={{ height: "100%" }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={8}
                            sx={{
                              [theme.breakpoints.down("md")]: {
                                my: 0,
                                mx: 2,
                              },
                              [theme.breakpoints.up("md")]: {
                                my: 4,
                                mx: 0,
                              },
                            }}
                          >
                            <Grid
                              item
                              container
                              sx={{ height: "100%" }}
                              xs={12}
                            >
                              <Grid item xs={12}>
                                <Typography fontWeight="bolder">
                                  {listing.title}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                container
                                xs={12}
                                sx={{
                                  [theme.breakpoints.down("md")]: {
                                    justifyContent: "space-between",
                                  },
                                }}
                              >
                                <Grid item xs="auto" md={2}>
                                  <Chip
                                    label={
                                      listing.apartment.surface.toString(10) +
                                      " m2"
                                    }
                                  />
                                </Grid>
                                <Grid item xs="auto" md={2}>
                                  <Chip
                                    label={
                                      listing.apartment.noOfRooms === 1
                                        ? "o camera"
                                        : listing.apartment.noOfRooms.toString() +
                                          " camere"
                                    }
                                  />
                                </Grid>
                                <Grid item xs="auto" md={2}>
                                  <Chip label={listing.apartment.subdivision} />
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                container
                                xs={12}
                                alignSelf="flex-end"
                                justifyContent="space-between"
                                alignItems="flex-end"
                                sx={{
                                  [theme.breakpoints.down("md")]: {
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                  },
                                }}
                              >
                                <Grid item>
                                  <Typography
                                    fontWeight="bolder"
                                    color={theme.palette.secondary.main}
                                  >
                                    {listing.price}€ / luna
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  container
                                  xs={12}
                                  md={4}
                                  flexDirection="column"
                                >
                                  <Grid item container alignContent="center">
                                    <Grid item>
                                      <Typography
                                        color={theme.palette.primary.main}
                                        fontWeight="bold"
                                        display="inline"
                                      >
                                        Scor proprietar:{" "}
                                        {getOwnerScore(
                                          listing.apartment.ownerId
                                        ).toPrecision(2)}{" "}
                                        / 5
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Star color="primary" fontSize="small" />
                                    </Grid>
                                  </Grid>
                                  <Grid item container alignContent="center">
                                    <Grid item>
                                      <Typography
                                        color={theme.palette.primary.main}
                                        fontWeight="bold"
                                        display="inline"
                                      >
                                        Scor apartament:{" "}
                                        {getApartmentScore(
                                          listing.apartment.id
                                        ).toPrecision(2)}{" "}
                                        / 5
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Star color="primary" fontSize="small" />
                                    </Grid>
                                  </Grid>
                                </Grid>
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
          <Grid
            item
            container
            xs={12}
            md={4}
            justifyContent="center"
            marginTop={2}
            alignContent="flex-start"
            rowSpacing={2}
            sx={{
              [theme.breakpoints.down("md")]: {
                order: 1,
              },
              [theme.breakpoints.up("md")]: {
                order: 2,
              },
            }}
          >
            <Grid item xs={12} md={8}>
              <Paper sx={{ width: "100%", borderRadius: "10px" }} elevation={4}>
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
                      fontWeight="bold"
                    >
                      Sorteaza
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10}>
                    <Select
                      fullWidth
                      onChange={(e) => setSortMethod(e.target.value)}
                      defaultValue={SortMethod.ApartmentScore}
                      value={sortMethod}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: sortMethod ? "" : "none" }}
                          onClick={() => {
                            setSortMethod("");
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
                    >
                      {Object.values(SortMethod).map((v) => (
                        <MenuItem value={v}>{v}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} marginTop={2}>
              <Paper sx={{ width: "100%", borderRadius: "10px" }} elevation={4}>
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
                      fontWeight="bold"
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
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
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
                  <Grid item xs={10} md={5} marginTop={-1}>
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
                        "& fieldset": { borderRadius: "10px" },
                      }}
                      color="secondary"
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
                  <Grid item xs={10} md={5} marginTop={-1}>
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
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
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
                  <Grid item xs={10} md={5} marginTop={-1}>
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
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
                    >
                      <MenuItem value={0}>Oricat</MenuItem>
                      <MenuItem value={30}>30mp</MenuItem>
                      <MenuItem value={40}>40mp</MenuItem>
                      <MenuItem value={50}>50mp</MenuItem>
                      <MenuItem value={100}>100mp</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={10} md={5} marginTop={-1}>
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
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
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
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
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
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>Zona</Typography>
                  </Grid>
                  <Grid item xs={10} marginTop={-1}>
                    <Select
                      fullWidth
                      onChange={handleAreaFilterChange}
                      defaultValue={""}
                      value={area}
                      inputProps={{ IconComponent: () => null }}
                      endAdornment={
                        <IconButton
                          sx={{ display: area ? "" : "none" }}
                          onClick={() => {
                            setArea("");
                          }}
                        >
                          <Clear />
                        </IconButton>
                      }
                      MenuProps={{
                        style: {
                          maxHeight: 200,
                        },
                      }}
                      sx={{ "& fieldset": { borderRadius: "10px" } }}
                      color="secondary"
                    >
                      {neighbourhoods.map((n) => (
                        <MenuItem value={n.neighbourhood}>
                          {n.neighbourhood}
                        </MenuItem>
                      ))}
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
