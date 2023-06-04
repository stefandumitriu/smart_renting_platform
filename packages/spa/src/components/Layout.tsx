import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AuthContext } from "../contexts/AuthContext";
import { OnComponentInitContext } from "../contexts/OnComponentInitContext";
import { useAuth0 } from "@auth0/auth0-react";
import {
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

  const createUserCallback = useCallback(async (user: any) => {
    const firstName: string | undefined = user.given_name;
    const lastName: string | undefined = user.family_name;
    const userProfile = await UserSignupRequest({
      userId: user.sub,
      email: user.email,
      firstName,
      lastName,
      profilePhotoUrl: user.picture,
    });
    setCurrentUser(userProfile);
  }, []);

  const loginUserCallback = useCallback(async (user: any) => {
    const userProfile = await UserLoginRequest(user.sub);
    if (!userProfile) {
      await createUserCallback(user);
      return;
    }
    setCurrentUser(userProfile);
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
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
      sx={{ backgroundColor: theme.palette.primary.main }}
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
        sx={{ backgroundColor: theme.palette.primary.main }}
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
                    loginWithRedirect().then((_) =>
                      console.log(isAuthenticated, user)
                    );
                  }
            }
            startIcon={<AccountCircleOutlinedIcon />}
          >
            {isAuthenticated &&
              currentUser &&
              (currentUser.firstName && currentUser.lastName
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : currentUser.email.split("@")[0])}
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
