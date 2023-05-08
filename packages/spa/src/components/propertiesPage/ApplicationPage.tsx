import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Application } from "@packages/api/models/listings/application";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Rating,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { StyledTextField } from "../landingPage/SignupForm";
import {
  CalendarToday,
  ChatBubble,
  Clear,
  Done,
  Email,
  Phone,
  Work,
} from "@mui/icons-material";
import { GetUserEmailRequest } from "../../requests/UserSignupRequest";
import moment from "moment";

const ApplicationPage: React.FC<{}> = () => {
  const { state } = useLocation();
  const application = useMemo(() => state.application as Application, [state]);
  const theme = useTheme();
  const navigate = useNavigate();
  const [tenantEmail, setTenantEmail] = useState<string | undefined>(undefined);
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: `${theme.palette.secondary.main}`,
    },
    "& .MuiRating-iconHover": {
      color: `${theme.palette.secondary.main}`,
    },
  });
  const fetchFn = useCallback(async () => {
    return GetUserEmailRequest(application.tenant.userId);
  }, [application]);

  useEffect(() => {
    fetchFn().then((data) => setTenantEmail(data));
  }, [fetchFn]);
  return (
    <Layout>
      <Grid
        item
        container
        sx={{ minHeight: "100vh" }}
        xs={10}
        spacing={4}
        alignContent="flex-start"
        marginX="auto"
        my={1}
      >
        <Grid item container xs={12} marginTop={2}>
          <Typography variant="h3" color={theme.palette.secondary.main}>
            Intrebarile chiriasului
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledTextField
            value={application.additionalInfo}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item container xs={12} md={3} alignItems="center">
          <Button
            onChange={() => console.log("clicked")}
            variant="contained"
            color="secondary"
            startIcon={<ChatBubble />}
          >
            Raspunde
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider
            flexItem
            sx={{
              backgroundColor: `${theme.palette.secondary.main}`,
              borderBottomWidth: 4,
            }}
          />
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <Typography variant="h3" color={theme.palette.secondary.main}>
            Detalii chirias - {application.tenant.firstName}{" "}
            {application.tenant.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar
            src={
              application.tenant.profilePhotoUrl ||
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
                {moment(application.tenant.dateOfBirth).format("DD-MM-YYYY")}{" "}
              </Typography>
              <Typography display="inline">
                (
                {moment().get("year") -
                  moment(application.tenant.dateOfBirth).get("year")}{" "}
                ani)
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} alignItems="center">
            <Grid item>
              <Work color="secondary" />
            </Grid>
            <Grid item>
              <Typography fontWeight="bold">
                {application.tenant.employmentStatus}
              </Typography>
            </Grid>
          </Grid>
          {application.tenant.about && (
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
                  <Typography>{application.tenant.about}</Typography>
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
              <Typography>{application.tenant.phoneNumber}</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item>
              <Email color="secondary" />
            </Grid>
            <Grid item>
              <Typography>{tenantEmail}</Typography>
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
          <Grid item container xs={12} marginTop={2}>
            <Grid item>
              <Typography color={theme.palette.secondary.main} variant="h5">
                Scor utilizator
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <Typography>Scor corectitudine</Typography>
            </Grid>
            <Grid item>
              <StyledRating
                defaultValue={2.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <Typography>Scor comunicare</Typography>
            </Grid>
            <Grid item>
              <StyledRating
                defaultValue={2.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <Typography>Scor disponibilitate</Typography>
            </Grid>
            <Grid item>
              <StyledRating
                defaultValue={2.5}
                precision={0.5}
                size="small"
                readOnly
              />
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
        <Grid item xs={12}>
          <Divider
            flexItem
            sx={{
              backgroundColor: `${theme.palette.secondary.main}`,
              borderBottomWidth: 4,
            }}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          marginX="auto"
          rowSpacing={2}
        >
          <Grid item xs={12} md="auto">
            <Button
              color="error"
              onClick={() => {
                console.log("Application rejected");
                navigate(`/properties/${application.listingId}/applications`);
              }}
              variant="contained"
              startIcon={<Clear />}
            >
              Refuza cerere
            </Button>
          </Grid>
          <Grid item xs={12} md="auto">
            <Button
              color="success"
              onClick={() => console.log("Application approved")}
              variant="contained"
              startIcon={<Done />}
            >
              Aproba cerere
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ApplicationPage;
