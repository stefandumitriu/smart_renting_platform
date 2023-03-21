import { Listing } from "@packages/api/models/listings/listing";
import Layout from "../Layout";
import { Grid, Typography } from "@mui/material";
import { userListingsLoader } from "../../loaders/UserListingsLoader";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserProfile } from "@packages/api/models/users/userProfile";

const UserFavouriteListings: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const [listings, setListings] = useState<Listing[] | undefined>(undefined);
  const fetchFn = useCallback(async () => {
    return userListingsLoader((currentUser as UserProfile).id);
  }, [currentUser]);
  useEffect(() => {
    fetchFn().then((data) => {
      console.log(data);
      setListings(data);
    });
  }, [fetchFn]);
  return (
    <Layout>
      <Grid item>
        {listings &&
          listings.map((listing) => {
            return <Typography>{listing.title}</Typography>;
          })}
      </Grid>
    </Layout>
  );
};

export default UserFavouriteListings;
