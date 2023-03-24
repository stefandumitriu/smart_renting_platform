import { Avatar, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../Layout";
import { GetUserEmailRequest } from "../../requests/UserSignupRequest";

const UserSettings: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const fetchFn = useCallback(async () => {
    if (!currentUser) {
      return undefined;
    }
    return GetUserEmailRequest(currentUser.userId);
  }, [currentUser]);
  useEffect(() => {
    fetchFn().then((data) => setUserEmail(data));
  }, [fetchFn]);

  return currentUser ? (
    <Layout pageTitle="Setari Profil">
      <Grid
        item
        container
        xs={12}
        sx={{ minHeight: "100vh" }}
        justifyContent="center"
      >
        <Grid item container xs={8} my={4}>
          <Grid item container xs={12} spacing={2}>
            <Grid item>
              <Avatar sx={{ height: "150px", width: "150px" }}></Avatar>
            </Grid>
            <Grid item>
              <Stack spacing={2}>
                <Typography variant="h3" color={theme.palette.secondary.main}>
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography
                  color={theme.palette.secondary.main}
                  fontStyle="italic"
                >
                  {userEmail}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  ) : (
    <Grid item>
      <Typography>Invalid User</Typography>
    </Grid>
  );
};

export default UserSettings;
