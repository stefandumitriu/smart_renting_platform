import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Layout from "../Layout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MobileStepper,
  Paper,
  Rating,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Listing } from "@packages/api/models/listings/listing";
import SwipeableViews from "react-swipeable-views";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import { AuthContext } from "../../contexts/AuthContext";
import {
  CreateFavouriteListingRequest,
  DeleteFavouriteListingRequest,
  GetTenantApplicationsRequest,
  GetUserFavouriteListingsRequest,
} from "../../requests/ListingsRequests";
import { FavouriteListing } from "@packages/api/models/listings/favouriteListing";
import OwnerProfileModal from "./OwnerProfileModal";
import RentApplyFormModal from "./RentApplyFormModal";

const PropertyPage: React.FC<{}> = () => {
  const params = useLoaderData() as Listing;
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const [initialFavouriteListing, setInitialFavouriteListing] = useState<
    FavouriteListing | undefined
  >(undefined);
  const [ownerProfileOpen, setOwnerProfileOpen] = useState(false);
  const [rentApplyFormModalOpen, setRentApplyFormModalOpen] = useState(false);
  const [hasAppliedForListing, setHasAppliedForListing] = useState(false);

  const handleRentApplyFormClose = useCallback(() => {
    setRentApplyFormModalOpen(false);
  }, []);

  const handleOwnerProfileClose = useCallback(() => {
    setOwnerProfileOpen(false);
  }, []);

  const fetchFavouriteListingsFn = useCallback(async () => {
    if (!currentUser) {
      return undefined;
    }
    const userFavouriteListings = await GetUserFavouriteListingsRequest(
      currentUser.id
    );
    return userFavouriteListings.find((e) => e.listingId === params.id);
  }, [currentUser, params]);

  const fetchTenantApplicationsFn = useCallback(async () => {
    if (!currentUser) {
      return false;
    }
    const applications = await GetTenantApplicationsRequest(currentUser.id);
    return !!applications.find((a) => a.listingId === params.id);
  }, [currentUser, params]);

  useEffect(() => {
    fetchFavouriteListingsFn().then((data) => setInitialFavouriteListing(data));
  }, [fetchFavouriteListingsFn]);

  useEffect(() => {
    fetchTenantApplicationsFn().then((data) => setHasAppliedForListing(data));
  }, [fetchTenantApplicationsFn]);

  useEffect(() => {
    setIsFavourite(!!initialFavouriteListing);
    setFavouriteListing(initialFavouriteListing);
  }, [initialFavouriteListing]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${theme.palette.secondary.main}`,
    },
    "& .MuiRating-iconHover": {
      color: `${theme.palette.secondary.main}`,
    },
  });

  const { address } = params.apartment;
  const ownerName = useMemo(() => {
    return `${params.apartment.owner.firstName} ${params.apartment.owner.lastName}`;
  }, [params]);

  const images: string[] = [
    "https://i.pinimg.com/originals/30/45/12/304512deb5caefbf2857c01acb5d5e56.jpg",
    "https://www.franklinsapartments.com/img/Apt5a.jpg",
    "https://www.franklinsapartments.com/img/Apt6c.jpg",
    "https://riceandroman.azureedge.net/prop-1464/1464-1.jpg",
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteListing, setFavouriteListing] = useState<
    FavouriteListing | undefined
  >(undefined);
  const noOfImages = images.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFavouriteButtonChange = useCallback(async () => {
    if (!isFavourite) {
      if (currentUser) {
        const apiFavouriteListing = await CreateFavouriteListingRequest(
          params.id,
          currentUser.id
        );
        setFavouriteListing(apiFavouriteListing);
      }
    } else {
      if (favouriteListing) {
        await DeleteFavouriteListingRequest(favouriteListing.id);
      }
    }
    setIsFavourite(!isFavourite);
  }, [isFavourite, favouriteListing, params, currentUser]);

  const handleNext = () => {
    setActiveImage(activeImage + 1);
  };

  const handleBack = () => {
    setActiveImage(activeImage - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveImage(step);
  };

  return (
    <Layout>
      <Grid item sx={{ width: "100%" }}>
        <Grid item container xs={8} marginX="auto">
          <Grid
            item
            container
            xs={12}
            marginTop={2}
            justifyContent="space-between"
          >
            <Grid item xs={10}>
              <Typography variant="h5">{params.title}</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="secondary"
                onClick={handleFavouriteButtonChange}
              >
                {isFavourite ? (
                  <FavoriteOutlined />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Typography
              variant="subtitle1"
              color={theme.palette.secondary.main}
            >
              Bucharest, {address.streetType} {address.streetName}
            </Typography>
          </Grid>
          <Grid item xs={8} marginTop={4}>
            <SwipeableViews
              index={activeImage}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((url, index) => (
                <Box
                  component="img"
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "block",
                    overflow: "hidden",
                  }}
                  src={url}
                  key={index}
                />
              ))}
            </SwipeableViews>
            <MobileStepper
              steps={noOfImages}
              position="static"
              activeStep={activeImage}
              sx={{
                backgroundColor: "transparent",
                ".MuiMobileStepper-dotActive": {
                  backgroundColor: "#76323e",
                },
              }}
              color={theme.palette.secondary.main}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeImage === noOfImages - 1}
                  color="secondary"
                >
                  Next
                  <KeyboardArrowRight color="secondary" />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeImage === 0}
                  color="secondary"
                >
                  <KeyboardArrowLeft color="secondary" />
                  Back
                </Button>
              }
            />
          </Grid>
          <Grid
            item
            container
            xs={3}
            marginX="auto"
            marginTop={4}
            alignContent="start"
            rowSpacing={4}
          >
            <Grid item xs={12} sx={{ minHeight: "40%" }}>
              <Card sx={{ width: "100%", height: "100%" }} elevation={4}>
                <CardActionArea
                  onClick={() => setOwnerProfileOpen(true)}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Grid
                      container
                      justifyContent="center"
                      alignContent="center"
                      sx={{ height: "100%" }}
                    >
                      <Grid item container xs={12} justifyContent="center">
                        <Grid item xs={4}>
                          <Avatar
                            sx={{ bgcolor: deepOrange[500], marginX: "auto" }}
                          >
                            {ownerName.split(" ")[0][0]}
                            {ownerName.split(" ")[1][0]}
                          </Avatar>
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
                        <Grid
                          item
                          container
                          xs={4}
                          justifyContent="center"
                          spacing={1}
                        >
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
            <Grid item xs={12} sx={{ minHeight: "20%" }}>
              <Card sx={{ width: "100%", height: "100%" }} elevation={4}>
                <CardActionArea
                  onClick={() => setOwnerProfileOpen(true)}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Grid
                      container
                      justifyContent="center"
                      alignContent="center"
                      sx={{ height: "100%" }}
                    >
                      <Grid item container xs={12} justifyContent="center">
                        <Grid
                          item
                          container
                          xs={6}
                          justifyContent="center"
                          spacing={1}
                        >
                          <Grid item xs={12}>
                            <Typography
                              fontWeight="bolder"
                              color={theme.palette.secondary.main}
                              textAlign="center"
                            >
                              Rating Apartament
                            </Typography>
                          </Grid>
                          <Grid item container xs={12} justifyContent="center">
                            <Grid item>
                              <StyledRating
                                defaultValue={2.5}
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
            <Grid item container xs={12} justifyContent="center">
              <Paper sx={{ width: "100%" }} elevation={4}>
                <Grid item container xs={12} rowSpacing={1} paddingX={2}>
                  <Grid item container xs={12} justifyContent="space-between">
                    <Grid item>
                      <Typography fontWeight="bolder">
                        Perioada Inchiriere
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{params.rentalPeriod}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        sx={{
                          backgroundColor: `${theme.palette.secondary.main}`,
                          borderBottomWidth: 2,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="space-between">
                    <Grid item>
                      <Typography fontWeight="bolder">
                        Disponibilitate
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{params.availability}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        sx={{
                          backgroundColor: `${theme.palette.secondary.main}`,
                          borderBottomWidth: 2,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} justifyContent="space-between">
                    <Grid item>
                      <Typography fontWeight="bolder">Pret</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color={theme.palette.secondary.main}
                        fontWeight="bold"
                      >
                        {params.price} € / luna
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
              <Grid item>
                {hasAppliedForListing ? (
                  <Tooltip title="Deja ai aplicat pentru acest apartament">
                    <span>
                      <Button color="secondary" variant="contained" disabled>
                        Depune cerere de inchiriere
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Button
                    onClick={() => setRentApplyFormModalOpen(true)}
                    color="secondary"
                    variant="contained"
                  >
                    Depune cerere de inchiriere
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={4}>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography variant="h5">Descriere</Typography>
              </Grid>
            </Grid>
            <Grid item xs={8} marginTop={2}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sagittis lacus ex, vestibulum fringilla lorem fermentum
                convallis. Ut sollicitudin auctor neque ut molestie. Vestibulum
                dictum dignissim arcu dapibus hendrerit. Cras facilisis
                consequat eros. Nulla eu venenatis nulla. Fusce imperdiet odio
                at turpis pulvinar, ut tincidunt quam imperdiet. Vestibulum
                pharetra sem nec metus facilisis, in gravida est gravida. Cras a
                magna non dui finibus aliquam. Ut maximus bibendum odio, id
                auctor sapien vestibulum in. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Integer ut ullamcorper nisl. Curabitur sem sem, ultricies vel
                arcu sit amet, aliquam pretium lectus. Cras commodo sit amet
                risus ac finibus.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={4}>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography variant="h5">Specificatii</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={8}
              marginTop={2}
              justifyContent="space-between"
            >
              <Grid item container xs={5} spacing={2} alignContent="flex-start">
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Nr. camere</Typography>
                  </Grid>
                  <Grid item container xs={4} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.noOfRooms}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Nr. bai</Typography>
                  </Grid>
                  <Grid item container xs={4} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.noOfBathrooms}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Suprafata</Typography>
                  </Grid>
                  <Grid item container xs={4} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.surface} mp
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Incalizre</Typography>
                  </Grid>
                  <Grid item container xs={8} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.heating}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>A.C.</Typography>
                  </Grid>
                  <Grid item container xs={4} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.cooling ? "Da" : "Nu"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={5} spacing={2} alignContent="flex-start">
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Nr. balcoane</Typography>
                  </Grid>
                  <Grid item container xs={4} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.noOfBalconies}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{ backgroundColor: "#76323e", borderBottomWidth: 2 }}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Cladire</Typography>
                  </Grid>
                  <Grid item container xs={8} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.buildingType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="space-between">
                  <Grid item xs={4}>
                    <Typography>Compartimentare</Typography>
                  </Grid>
                  <Grid item container xs={8} justifyContent="end">
                    <Typography fontWeight="bold">
                      {params.apartment.subdivision}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        backgroundColor: `${theme.palette.secondary.main}`,
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={4}>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography variant="h5">Finisaje</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} marginTop={2}>
              <Grid item xs={12}>
                {params.apartment.utilities &&
                  Object.entries(params.apartment.utilities).map(
                    (e) => e[1] && <Typography>{e[0]}</Typography>
                  )}
              </Grid>
              <Grid item xs={12}>
                {params.apartment.appliances &&
                  Object.entries(params.apartment.appliances).map(
                    (e) => e[1] && <Typography>{e[0]}</Typography>
                  )}
              </Grid>
              <Grid item xs={12}>
                {params.apartment.finishes &&
                  Object.entries(params.apartment.finishes).map(
                    (e) => e[1] && <Typography>{e[0]}</Typography>
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={4}>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography variant="h5">Informatii Zona</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} marginTop={2}>
              <Grid item xs={8}>
                <Typography>{params.apartment.areaInfo}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OwnerProfileModal
        open={ownerProfileOpen}
        handleClose={handleOwnerProfileClose}
        owner={params.apartment.owner}
      />
      <RentApplyFormModal
        open={rentApplyFormModalOpen}
        listing={params}
        handleClose={handleRentApplyFormClose}
        setHasAppliedForListing={() => setHasAppliedForListing(true)}
      />
    </Layout>
  );
};

export default PropertyPage;
