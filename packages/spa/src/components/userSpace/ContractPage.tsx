import Layout from "../Layout";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Contract } from "@packages/api/models/contract";
import { GetTenantContractRequest } from "../../requests/ContractsRequest";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Collapse,
  Divider,
  Grid,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment/moment";
import { Address } from "@packages/api/models/listings/address";
import { Apartment } from "@packages/api/models/listings/apartment";
import { UserProfile } from "@packages/api/models/users/userProfile";
import { CalendarToday, Email, Phone, Work } from "@mui/icons-material";
import { GetUserEmailRequest } from "../../requests/UserSignupRequest";

interface ContractPageProps {
  userIsTenant?: boolean;
}

const getFullAddress = (address: Address) => {
  return `${address.streetType} ${address.streetName}, Nr. ${address.streetNumber}`;
};

const getExtras = (apartment: Apartment) => {
  return Object.entries(apartment.appliances || {})
    .filter((e) => e[1])
    .map((e) => e[0])
    .toString();
};

const UserInfo: React.FC<{ user: UserProfile; theme: Theme }> = ({
  user,
  theme,
}) => {
  const [email, setEmail] = useState<string>("");

  const fetchFn = useCallback(async () => {
    return GetUserEmailRequest(user.userId);
  }, [user]);

  useEffect(() => {
    fetchFn().then((data) => setEmail(data));
  }, [fetchFn]);

  return (
    <>
      <Grid item container xs={12} marginTop={2} justifyContent="space-between">
        <Grid item xs={12} md="auto">
          <Typography variant="h4" color={theme.palette.secondary.main}>
            Detalii chirias - {user.firstName} {user.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button color="secondary" variant="contained">
            Adauga recenzie
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} my={2}>
        <Avatar
          src={
            user.profilePhotoUrl ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AProfile_avatar_placeholder_large.png&psig=AOvVaw3g8UGAKNOxuU_4r-3pVqwN&ust=1683649237783000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNDKwaeQ5v4CFQAAAAAdAAAAABAE"
          }
          sx={{ width: 128, height: 128 }}
        />
      </Grid>
      <Grid item container xs={8} rowSpacing={1}>
        <Grid item container xs={12} spacing={1} alignItems="center">
          <Grid item>
            <CalendarToday color="secondary" />
          </Grid>
          <Grid item>
            <Typography fontWeight="bold" display="inline">
              {moment(user.dateOfBirth).format("DD-MM-YYYY")}{" "}
            </Typography>
            <Typography display="inline">
              ({moment().get("year") - moment(user.dateOfBirth).get("year")}{" "}
              ani)
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1} alignItems="center">
          <Grid item>
            <Work color="secondary" />
          </Grid>
          <Grid item>
            <Typography fontWeight="bold">{user.employmentStatus}</Typography>
          </Grid>
        </Grid>
        {user.about && (
          <>
            <Grid item container xs={12}>
              <Grid item>
                <Typography color={theme.palette.secondary.main} variant="h5">
                  Despre
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item>
                <Typography>{user.about}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider
                sx={{
                  backgroundColor: `${theme.palette.secondary.main}`,
                  borderBottomWidth: 2,
                }}
              />
            </Grid>
          </>
        )}
        <Grid item container xs={12} marginTop={2}>
          <Grid item>
            <Typography color={theme.palette.secondary.main} variant="h5">
              Contact
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item>
            <Phone color="secondary" />
          </Grid>
          <Grid item>
            <Typography>{user.phoneNumber}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item>
            <Email color="secondary" />
          </Grid>
          <Grid item>
            <Typography>{email}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="flex-start">
          <Button
            color="secondary"
            onClick={() => console.log("Review clicked")}
            variant="contained"
          >
            Vezi recenziile
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const ContractPage: React.FC<ContractPageProps> = ({ userIsTenant }) => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();

  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      if (userIsTenant) {
        GetTenantContractRequest(currentUser.id).then((c) => setContract(c));
      }
    }
  }, [currentUser, userIsTenant]);

  useEffect(() => {
    if (contract) {
      setOpen(contract.status === "Draft");
    }
  }, [contract]);

  return (
    <Layout pageTitle="Contract inchiriere">
      {contract && (
        <Grid
          item
          container
          sx={{ minHeight: "100vh" }}
          xs={10}
          alignContent="flex-start"
          marginX="auto"
          marginY={2}
        >
          <Grid item container xs={12}>
            <Collapse in={open} sx={{ width: "100%" }}>
              <Alert
                severity="warning"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => setOpen(false)}
                  >
                    Confirma Contract
                  </Button>
                }
                sx={{ width: "100%" }}
              >
                <AlertTitle>Acest contract este un draft!</AlertTitle>
                Citeste informatiile contractuale apoi confirma aici
              </Alert>
            </Collapse>
          </Grid>
          <Grid item container xs={12} marginTop={2}>
            <Typography variant="h4" color={theme.palette.secondary.main}>
              Detalii Contract
            </Typography>
          </Grid>
          <Grid item container xs={12} columnSpacing={2} marginTop={2}>
            <Grid item xs={12} md="auto">
              <Typography
                fontWeight="bold"
                color={theme.palette.secondary.main}
              >
                Interval Inchiriere
              </Typography>
            </Grid>
            <Grid item container xs={12} md="auto">
              <Typography>
                {moment(contract.startDate).format("DD-MM-YYYY")}
                {" - "}
                {contract.endDate
                  ? moment(contract.endDate).format("DD-MM-YYYY")
                  : "Nedeterminat"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2} marginTop={1}>
            <Grid item xs={12} md="auto">
              <Typography
                fontWeight="bold"
                color={theme.palette.secondary.main}
              >
                Zi plata
              </Typography>
            </Grid>
            <Grid item container xs={12} md="auto">
              <Typography>{contract.rentPayday}</Typography>
            </Grid>
          </Grid>
          {contract.paymentInfo && (
            <Grid item container xs={12} columnSpacing={2} marginTop={1}>
              <Grid item xs={12} md="auto">
                <Typography
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
                >
                  Modalitate de plata
                </Typography>
              </Grid>
              <Grid item container xs={12} md="auto">
                <Typography>{contract.paymentInfo}</Typography>
              </Grid>
            </Grid>
          )}
          {contract.additionalClauses && (
            <Grid item container xs={12} columnSpacing={2} marginTop={1}>
              <Grid item xs={12} md="auto">
                <Typography
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
                >
                  Modalitate de plata
                </Typography>
              </Grid>
              <Grid item container xs={12} md="auto">
                <Typography>{contract.additionalClauses}</Typography>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} marginTop={2}>
            <Divider
              sx={{
                backgroundColor: `${theme.palette.secondary.main}`,
                borderBottomWidth: 2,
              }}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            marginTop={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} md="auto">
              <Typography variant="h4" color={theme.palette.secondary.main}>
                Detalii Apartament
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto">
              <Button variant="contained" color="secondary">
                Adauga recenzie
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2} marginTop={2}>
            <Grid item xs={12} md="auto">
              <Typography
                fontWeight="bold"
                color={theme.palette.secondary.main}
              >
                Adresa
              </Typography>
            </Grid>
            <Grid item container xs={12} md="auto">
              <Typography>
                {getFullAddress(contract.apartment.address)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2} marginTop={1}>
            <Grid item xs={12} md="auto">
              <Typography
                fontWeight="bold"
                color={theme.palette.secondary.main}
              >
                Suprafata Apartament
              </Typography>
            </Grid>
            <Grid item container xs={12} md="auto">
              <Typography>{contract.apartment.surface} .m.p</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2} marginTop={1}>
            <Grid item xs={12} md="auto">
              <Typography
                fontWeight="bold"
                color={theme.palette.secondary.main}
              >
                Dotari
              </Typography>
            </Grid>
            <Grid item container xs={12} md="auto">
              <Typography>{getExtras(contract.apartment)}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md="auto" marginTop={1}>
            <Button variant="contained" color="secondary">
              Vezi recenziile
            </Button>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Divider
              flexItem
              sx={{
                backgroundColor: `${theme.palette.secondary.main}`,
                borderBottomWidth: 2,
              }}
            />
          </Grid>
          <UserInfo
            user={userIsTenant ? contract.landlord : contract.tenant}
            theme={theme}
          />
        </Grid>
      )}
    </Layout>
  );
};

export default ContractPage;
