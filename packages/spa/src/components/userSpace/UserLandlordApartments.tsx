import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Layout from "../Layout";
import { AuthContext } from "../../contexts/AuthContext";
import {
  DeleteApartmentRequest,
  GetApartmentsByOwnerIdRequest,
} from "../../requests/ApartmentsRequests";
import { Apartment } from "@packages/api/models/listings/apartment";
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

enum ApartmentStatus {
  UnderReview = "Under Review",
  Available = "Available",
  Listed = "Listed",
  Rented = "Rented",
}

interface ApartmentCardProps {
  apartment: Apartment;
  handleDelete: (id: string) => Promise<void>;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  handleDelete,
}) => {
  const theme = useTheme();

  const getBgColorFromApartmentStatus = (apartmentStatus: ApartmentStatus) => {
    switch (apartmentStatus) {
      case ApartmentStatus.Available:
        return theme.palette.primary.main;
      case ApartmentStatus.Listed:
        return theme.palette.secondary.light;
      case ApartmentStatus.Rented:
        return theme.palette.error.light;
      default:
        return theme.palette.error.light;
    }
  };

  const getTextColorFromApartmentStatus = (
    apartmentStatus: ApartmentStatus
  ) => {
    switch (apartmentStatus) {
      case ApartmentStatus.Available:
        return "black";
      case ApartmentStatus.Listed:
        return "white";
      case ApartmentStatus.Rented:
        return "black";
      default:
        return "black";
    }
  };
  return (
    <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={4}>
      <Grid container>
        <Grid item xs={10}>
          <Card
            sx={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              height: "100%",
            }}
          >
            <CardActionArea
              href={`/apartments/${apartment.id}`}
              sx={{ height: "100%" }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Grid container rowSpacing={2} sx={{ height: "100%" }}>
                  <Paper
                    sx={{
                      zIndex: 1,
                      textAlign: "center",
                      marginLeft: "-16px",
                      paddingX: "8px",
                      paddingY: "4px",
                      backgroundColor: getBgColorFromApartmentStatus(
                        apartment.status
                      ),
                      color: getTextColorFromApartmentStatus(apartment.status),
                    }}
                  >
                    {apartment.status}
                  </Paper>
                  <Grid
                    item
                    container
                    xs={12}
                    justifyContent="center"
                    marginTop={-2}
                  >
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
                        {apartment.address.streetType}{" "}
                        {apartment.address.streetName}
                        {", "}
                        Nr.{apartment.address.streetNumber}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} marginBottom={2}>
                    <Grid item xs={2}>
                      <Chip label={apartment.surface.toString(10) + " m2"} />
                    </Grid>
                    <Grid item xs={2}>
                      <Chip
                        label={
                          apartment.noOfRooms === 1
                            ? "o camera"
                            : apartment.noOfRooms.toString() + " camere"
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Chip label={apartment.subdivision} />
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
              <Button
                color="error"
                variant="contained"
                fullWidth
                onClick={() => handleDelete(apartment.id)}
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

const UserLandlordApartments: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [page, setPage] = useState(1);

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, p: number) => {
      setPage(p);
      window.scrollTo(0, 0);
    },
    [setPage]
  );

  const fetchFn = useCallback(async () => {
    if (currentUser) {
      return GetApartmentsByOwnerIdRequest(currentUser.id);
    }
    return [];
  }, [currentUser]);
  useEffect(() => {
    fetchFn().then((response) => setApartments(response));
  }, [setApartments, fetchFn]);

  const deleteCallback = useCallback(
    async (id: string) => {
      const statusCode = await DeleteApartmentRequest(id);
      console.log(statusCode);
      if (statusCode === 204) {
        setApartments(apartments.filter((a) => a.id !== id));
      }
    },
    [apartments]
  );

  const displayedApartments = useMemo(() => {
    return apartments.slice((page - 1) * 10, page * 10);
  }, [apartments, page]);

  const pageCount = useMemo(() => {
    return Math.ceil(apartments.length / 10);
  }, [apartments]);

  return (
    <Layout pageTitle="Apartamentele mele">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        spacing={4}
        xs={10}
        justifyContent="center"
        alignContent="flex-start"
        marginX="auto"
        my={1}
      >
        {displayedApartments.map((apartment) => (
          <Grid item xs={12}>
            <ApartmentCard
              apartment={apartment}
              handleDelete={deleteCallback}
            />
          </Grid>
        ))}
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
    </Layout>
  );
};

export default UserLandlordApartments;
