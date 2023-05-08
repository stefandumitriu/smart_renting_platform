import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import UserLoginModal from "./landingPage/UserLoginModal";
import { AuthContext } from "../contexts/AuthContext";
import { OnComponentInitContext } from "../contexts/OnComponentInitContext";

interface LayoutProps {
  children?: ReactNode;
  pageTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  const theme = useTheme();
  const [openLogin, setOpenLogin] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const onInit = useContext(OnComponentInitContext);

  const handleLoginOpen = useCallback(() => {
    setOpenLogin(true);
  }, [setOpenLogin]);

  const handleLoginClose = useCallback(() => {
    setOpenLogin(false);
  }, [setOpenLogin]);

  useEffect(() => onInit(), [onInit]);

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
              currentUser
                ? () => {
                    navigate("/user/dashboard");
                  }
                : handleLoginOpen
            }
            startIcon={<AccountCircleOutlinedIcon />}
          >
            {currentUser && `${currentUser.firstName} ${currentUser.lastName}`}
          </Button>
        </Grid>
      </Grid>
      <UserLoginModal open={openLogin} handleClose={handleLoginClose} />
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
