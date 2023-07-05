import Layout from "../Layout";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Contract } from "@packages/api/models/contract";
import {
  GetLandlordApartmentContractRequest,
  GetTenantContractRequest,
  UpdateContractRequest,
} from "../../requests/ContractsRequest";
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
import { Link, useLocation } from "react-router-dom";
import EditContractModal from "./EditContractModal";
import CreateUserReviewModal from "./reviews/CreateUserReviewModal";
import CreateApartmentReviewModal from "./reviews/CreateApartmentReviewModal";
import {
  GetApartmentReviewByReviewerId,
  GetLandlordReviewByReviewerId,
  GetTenantReviewByReviewerId,
} from "../../requests/ReviewsRequests";
import { ApartmentReview } from "@packages/api/models";
import UpdateApartmentReviewModal from "./reviews/UpdateApartmentReviewModal";

enum ContractStatus {
  Draft = "Draft",
  Ongoing = "In desfasurare",
  Closed = "Incheiat",
}

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

const UserInfo: React.FC<{
  user: UserProfile;
  theme: Theme;
  handleUserReviewModalOpen: () => void;
  userIsTenant?: boolean;
  alreadyReviewed: boolean;
}> = ({
  user,
  theme,
  handleUserReviewModalOpen,
  userIsTenant,
  alreadyReviewed,
}) => {
  return (
    <>
      <Grid item container xs={12} marginTop={2} justifyContent="space-between">
        <Grid item xs={12} md="auto">
          <Typography variant="h4" color={theme.palette.secondary.main}>
            Detalii {userIsTenant ? "proprietar" : "chirias"} - {user.firstName}{" "}
            {user.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12} md="auto">
          {alreadyReviewed ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleUserReviewModalOpen()}
              sx={{ borderRadius: "10px" }}
            >
              Editeaza recenzie
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleUserReviewModalOpen()}
              sx={{ borderRadius: "10px" }}
            >
              Adauga recenzie
            </Button>
          )}
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
            <Typography>{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="flex-start">
          <Grid item xs={12} md="auto" marginTop={1}>
            <Link
              to={`/user/dashboard/${userIsTenant ? "landlord" : "tenant"}/${
                user.id
              }/reviews`}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "10px" }}
              >
                Vezi recenziile
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const ContractDetailsSection: React.FC<{
  contract: Contract;
  userIsTenant?: boolean;
  updateContractCallback: (contract: Contract) => void;
}> = ({ contract, userIsTenant, updateContractCallback }) => {
  const theme = useTheme();
  const [editContractModalOpen, setEditContractModalOpen] =
    useState<boolean>(false);
  const handleClose = useCallback(() => {
    setEditContractModalOpen(false);
  }, [setEditContractModalOpen]);
  return (
    <>
      <Grid item container xs={12} marginTop={2} justifyContent="space-between">
        <Grid item xs={12} md="auto">
          <Typography variant="h4" color={theme.palette.secondary.main}>
            Detalii Contract
          </Typography>
        </Grid>
        {contract.status === "Draft" && !userIsTenant && (
          <Grid item xs={12} md="auto">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditContractModalOpen(true)}
              sx={{ borderRadius: "10px" }}
            >
              Editeaza contract
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container xs={12} columnSpacing={2} marginTop={2}>
        <Grid item xs={12} md="auto">
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
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
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
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
            <Typography fontWeight="bold" color={theme.palette.secondary.main}>
              Modalitate de plata
            </Typography>
          </Grid>
          <Grid item container xs={12} md="auto">
            <Typography>{contract.paymentInfo}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid item container xs={12} columnSpacing={2} marginTop={1}>
        <Grid item xs={12} md="auto">
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
            Chirie lunara
          </Typography>
        </Grid>
        <Grid item container xs={12} md="auto">
          <Typography>{contract.price} euro</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} columnSpacing={2} marginTop={1}>
        <Grid item xs={12} md="auto">
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
            Garantie
          </Typography>
        </Grid>
        <Grid item container xs={12} md="auto">
          <Typography>{contract.depositValue} euro</Typography>
        </Grid>
      </Grid>
      {contract.additionalClauses && (
        <Grid item container xs={12} columnSpacing={2} marginTop={1}>
          <Grid item xs={12} md="auto">
            <Typography fontWeight="bold" color={theme.palette.secondary.main}>
              Modalitate de plata
            </Typography>
          </Grid>
          <Grid item container xs={12} md="auto">
            <Typography>{contract.additionalClauses}</Typography>
          </Grid>
        </Grid>
      )}
      <EditContractModal
        open={editContractModalOpen}
        handleClose={handleClose}
        contract={contract}
        updateCallback={updateContractCallback}
      />
    </>
  );
};

interface ApartmentInfoProps {
  apartment: Apartment;
  theme: Theme;
  handleApartmentReviewModalOpen: () => void;
  handleUpdateApartmentReviewModalOpen: () => void;
  apartmentReview?: ApartmentReview;
}

const ApartmentInfo: React.FC<ApartmentInfoProps> = ({
  apartment,
  theme,
  handleApartmentReviewModalOpen,
  handleUpdateApartmentReviewModalOpen,
  apartmentReview,
}: ApartmentInfoProps) => {
  return (
    <>
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
          {!!apartmentReview ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateApartmentReviewModalOpen()}
              sx={{ borderRadius: "10px" }}
            >
              Editeaza recenzie
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApartmentReviewModalOpen()}
              sx={{ borderRadius: "10px" }}
            >
              Adauga recenzie
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container xs={12} columnSpacing={2} marginTop={2}>
        <Grid item xs={12} md="auto">
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
            Adresa
          </Typography>
        </Grid>
        <Grid item container xs={12} md="auto">
          <Typography>{getFullAddress(apartment.address)}</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} columnSpacing={2} marginTop={1}>
        <Grid item xs={12} md="auto">
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
            Suprafata Apartament
          </Typography>
        </Grid>
        <Grid item container xs={12} md="auto">
          <Typography>{apartment.surface} m.p.</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} columnSpacing={2} marginTop={1}>
        <Grid item xs={12} md="auto">
          <Typography fontWeight="bold" color={theme.palette.secondary.main}>
            Dotari
          </Typography>
        </Grid>
        <Grid item container xs={12} md="auto">
          <Typography>{getExtras(apartment)}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md="auto" marginTop={1}>
        <Link to={`/apartments/${apartment.id}/reviews`}>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "10px" }}
          >
            Vezi recenziile
          </Button>
        </Link>
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
    </>
  );
};

const ContractPage: React.FC<ContractPageProps> = ({ userIsTenant }) => {
  const { currentUser } = useContext(AuthContext);
  const { state } = useLocation();
  const theme = useTheme();

  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [userReviewed, setUserReviewed] = useState(false);
  const [apartmentReview, setApartmentReview] = useState<
    ApartmentReview | undefined
  >(undefined);
  useEffect(() => {
    if (currentUser && contract) {
      GetApartmentReviewByReviewerId(contract.apartmentId, currentUser.id).then(
        (res) => {
          if (res) {
            setApartmentReview(res);
          }
        }
      );
    }
  }, [currentUser, contract, setApartmentReview]);
  useEffect(() => {
    if (currentUser && contract) {
      if (userIsTenant) {
        GetLandlordReviewByReviewerId(contract.landlordId, currentUser.id).then(
          (res) => {
            if (res) {
              setUserReviewed(true);
            } else {
              setUserReviewed(false);
            }
          }
        );
      } else {
        GetTenantReviewByReviewerId(contract.tenantId, currentUser.id).then(
          (res) => {
            if (res) {
              setUserReviewed(true);
            } else {
              setUserReviewed(false);
            }
          }
        );
      }
    }
  }, [setUserReviewed, currentUser, contract, userIsTenant]);
  const [userReviewModalOpen, setUserReviewModalOpen] =
    useState<boolean>(false);
  const [apartmentReviewModalOpen, setApartmentReviewModalOpen] =
    useState<boolean>(false);
  const [updateApartmentReviewModalOpen, setUpdateApartmentReviewModalOpen] =
    useState(false);

  const handleUpdateApartmentReviewModalOpen = useCallback(
    () => setUpdateApartmentReviewModalOpen(true),
    [setUpdateApartmentReviewModalOpen]
  );
  const handleUpdateApartmentReviewModalClose = useCallback(
    () => setUpdateApartmentReviewModalOpen(false),
    [setUpdateApartmentReviewModalOpen]
  );
  const handleApartmentReviewModalOpen = useCallback(
    () => setApartmentReviewModalOpen(true),
    [setApartmentReviewModalOpen]
  );

  const handleApartmentReviewModalClose = useCallback(
    () => setApartmentReviewModalOpen(false),
    [setApartmentReviewModalOpen]
  );

  const handleUserReviewModalClose = useCallback(
    () => setUserReviewModalOpen(false),
    [setUserReviewModalOpen]
  );

  const handleUserReviewModalOpen = useCallback(
    () => setUserReviewModalOpen(true),
    [setUserReviewModalOpen]
  );

  const handleUserReviewModalSubmit = useCallback(
    () => setUserReviewed(true),
    [setUserReviewed]
  );

  const handleApartmentReviewModalSubmit = useCallback(
    (apartmentReview: ApartmentReview) => setApartmentReview(apartmentReview),
    [setApartmentReview]
  );

  const updateContractCallback = useCallback(
    (contract: Contract) => {
      setContract(contract);
    },
    [setContract]
  );

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      if (userIsTenant) {
        GetTenantContractRequest(currentUser.id).then((c) => setContract(c));
      } else {
        GetLandlordApartmentContractRequest(
          currentUser.id,
          state.apartmentId
        ).then((c) => setContract(c));
      }
    }
  }, [currentUser, userIsTenant, state]);

  const changeContractStatus = useCallback(async () => {
    if (contract) {
      await UpdateContractRequest(contract.id, {
        status: ContractStatus.Ongoing,
      });
    }
    setOpen(false);
  }, [contract]);

  useEffect(() => {
    if (contract) {
      setOpen(contract.status === "Draft");
    }
  }, [contract]);

  return (
    <Layout pageTitle="Contract inchiriere">
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        xs={10}
        alignContent="flex-start"
        marginX="auto"
        marginY={2}
      >
        {contract ? (
          <>
            <Grid item container xs={12}>
              {userIsTenant && (
                <Collapse in={open} sx={{ width: "100%" }}>
                  <Alert
                    severity="warning"
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        onClick={() => changeContractStatus()}
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
              )}
            </Grid>
            <ContractDetailsSection
              contract={contract}
              updateContractCallback={updateContractCallback}
              userIsTenant={userIsTenant}
            />
            <Grid item xs={12} marginTop={2}>
              <Divider
                sx={{
                  backgroundColor: `${theme.palette.secondary.main}`,
                  borderBottomWidth: 2,
                }}
              />
            </Grid>
            {userIsTenant && (
              <ApartmentInfo
                apartment={contract.apartment}
                theme={theme}
                handleApartmentReviewModalOpen={handleApartmentReviewModalOpen}
                handleUpdateApartmentReviewModalOpen={
                  handleUpdateApartmentReviewModalOpen
                }
                apartmentReview={apartmentReview}
              />
            )}
            <UserInfo
              user={userIsTenant ? contract.landlord : contract.tenant}
              theme={theme}
              handleUserReviewModalOpen={handleUserReviewModalOpen}
              userIsTenant={userIsTenant}
              alreadyReviewed={userReviewed}
            />
            <CreateUserReviewModal
              open={userReviewModalOpen}
              handleClose={handleUserReviewModalClose}
              contract={contract}
              type={userIsTenant ? "LANDLORD" : "TENANT"}
              handleSubmit={handleUserReviewModalSubmit}
            />
            <CreateApartmentReviewModal
              open={apartmentReviewModalOpen}
              handleClose={handleApartmentReviewModalClose}
              contract={contract}
              handleSubmit={handleApartmentReviewModalSubmit}
            />
            {apartmentReview && (
              <UpdateApartmentReviewModal
                open={updateApartmentReviewModalOpen}
                handleClose={handleUpdateApartmentReviewModalClose}
                apartmentReview={apartmentReview}
                handleSubmit={handleApartmentReviewModalSubmit}
              />
            )}
          </>
        ) : (
          <Grid item container justifyContent="center">
            <Grid item>
              <Typography>Nu exista niciun contract activ</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default ContractPage;
