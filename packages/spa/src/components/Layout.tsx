import React, { ReactNode, useCallback, useState } from "react";
import { Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import UserLoginModal from "./landingPage/UserLoginModal";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginOpen = useCallback(() => {
    setOpenLogin(true);
  }, [setOpenLogin]);

  const handleLoginClose = useCallback(() => {
    setOpenLogin(false);
  }, [setOpenLogin]);

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
        justifyContent="space-evenly"
        alignSelf="center"
        position="sticky"
        top={0}
        zIndex={100}
        mt={1}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Grid item my="auto">
          <Link to={"/"}>
            <img
              src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
              alt="logo-app"
            />
          </Link>
        </Grid>
        <Grid item my="auto">
          <Typography color={theme.palette.secondary.main} fontWeight="bolder">
            Search properties
          </Typography>
        </Grid>
        <Grid item my="auto">
          <Typography color={theme.palette.secondary.main} fontWeight="bolder">
            List a property
          </Typography>
        </Grid>
        <Grid item my="auto">
          <Link to={"/map"} style={{ textDecoration: "none" }}>
            <Button
              onClick={() => {}}
              variant="text"
              sx={{ textTransform: "none" }}
            >
              <Typography
                color={theme.palette.secondary.main}
                fontWeight="bolder"
              >
                Show map
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <IconButton color="secondary" onClick={handleLoginOpen}>
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <UserLoginModal open={openLogin} handleClose={handleLoginClose} />
      {children}
    </Grid>
  );
};

export default Layout;