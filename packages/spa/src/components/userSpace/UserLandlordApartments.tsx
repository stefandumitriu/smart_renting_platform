import React, { useCallback, useContext, useEffect, useState } from "react";
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
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

interface ApartmentCardProps {
  apartment: Apartment;
  handleDelete: (id: string) => Promise<void>;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  handleDelete,
}) => {
  const theme = useTheme();
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
                        {apartment.address.streetType}{" "}
                        {apartment.address.streetName}{" "}
                        {apartment.address.streetNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
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

  return (
    <Layout pageTitle="Apartamentele mele">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        spacing={2}
        xs={10}
        justifyContent="center"
        marginX="auto"
      >
        {apartments.map((apartment) => (
          <Grid item xs={12}>
            <ApartmentCard
              apartment={apartment}
              handleDelete={deleteCallback}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default UserLandlordApartments;
