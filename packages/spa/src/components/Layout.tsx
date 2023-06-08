import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import { Avatar, Button, Grid, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AuthContext } from "../contexts/AuthContext";
import { OnComponentInitContext } from "../contexts/OnComponentInitContext";
import { useAuth0 } from "@auth0/auth0-react";
import {
  UpdateUserProfileRequest,
  UserLoginRequest,
  UserSignupRequest,
} from "../requests/UserSignupRequest";

interface LayoutProps {
  children?: ReactNode;
  pageTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  const theme = useTheme();
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const onInit = useContext(OnComponentInitContext);

  const createUserCallback = useCallback(
    async (user: any) => {
      const firstName: string | undefined = user.given_name;
      const lastName: string | undefined = user.family_name;
      const email =
        (user.email as string) ??
        (firstName && lastName
          ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`
          : "default_email@gmail.com");
      const userProfile = await UserSignupRequest({
        userId: user.sub,
        email,
        firstName,
        lastName,
        profilePhotoUrl: user.picture,
      });
      setCurrentUser(userProfile);
    },
    [setCurrentUser]
  );

  const loginUserCallback = useCallback(
    async (user: any) => {
      let userProfile = await UserLoginRequest(user.sub);
      if (!userProfile) {
        await createUserCallback(user);
        return;
      }
      if (user.picture && user.picture !== userProfile.profilePhotoUrl) {
        userProfile = await UpdateUserProfileRequest(userProfile.id, {
          profilePhotoUrl: user.picture,
        });
      }
      setCurrentUser(userProfile);
    },
    [createUserCallback, setCurrentUser]
  );

  useEffect(() => {
    if (user) {
      loginUserCallback(user);
    }
  }, [user]);

  useEffect(() => onInit(), [onInit]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      flexDirection="column"
      spacing={1}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Grid
        item
        container
        justifyContent="space-between"
        alignSelf="center"
        position="sticky"
        top={0}
        zIndex={100}
        mt={1}
        sx={{ backgroundColor: theme.palette.background.default }}
        paddingY={2}
        borderBottom={2}
        borderColor={theme.palette.secondary.main}
      >
        <Grid item my="auto" marginLeft={10}>
          <Link to={"/"}>
            <img
              src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
              alt="logo-app"
            />
          </Link>
        </Grid>
        {pageTitle && (
          <Grid item mx="auto">
            <Typography color={theme.palette.secondary.main} variant="h4">
              {pageTitle}
            </Typography>
          </Grid>
        )}
        <Grid item marginRight={10}>
          <Button
            color="secondary"
            onClick={
              isAuthenticated
                ? () => {
                    navigate("/user/dashboard");
                  }
                : () => {
                    loginWithRedirect();
                  }
            }
            startIcon={
              isAuthenticated && currentUser && currentUser.profilePhotoUrl ? (
                <Avatar
                  src={currentUser.profilePhotoUrl}
                  sx={{ width: 24, height: 24 }}
                />
              ) : (
                <AccountCircleOutlinedIcon />
              )
            }
          >
            <Typography fontWeight="bold">
              {isAuthenticated && currentUser
                ? currentUser.firstName && currentUser.lastName
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : currentUser.email.split("@")[0]
                : "Log in"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      {children}
      <Grid
        item
        container
        xs={12}
        justifyContent={"center"}
        sx={{ backgroundColor: "white" }}
        marginTop={2}
      >
        <Grid item>
          <Typography>All rights reserved @ Stefan Dumitriu - 2023</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
