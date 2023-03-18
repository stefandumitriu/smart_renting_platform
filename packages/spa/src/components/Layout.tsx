import React, { ReactNode, useCallback, useContext, useState } from "react";
import { Button, Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import UserLoginModal from "./landingPage/UserLoginModal";
import { AuthContext } from "../contexts/AuthContext";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [openLogin, setOpenLogin] = useState(false);
  const { currentUser } = useContext(AuthContext);

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
        <Grid item marginRight={10}>
          <Button
            color="secondary"
            onClick={handleLoginOpen}
            startIcon={<AccountCircleOutlinedIcon />}
          >
            {currentUser && `${currentUser.firstName} ${currentUser.lastName}`}
          </Button>
        </Grid>
      </Grid>
      <UserLoginModal open={openLogin} handleClose={handleLoginClose} />
      {children}
    </Grid>
  );
};

export default Layout;
