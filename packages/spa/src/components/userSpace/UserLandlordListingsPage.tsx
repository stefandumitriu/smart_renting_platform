import { Listing } from "@packages/api/models/listings/listing";
import Layout from "../Layout";
import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { GetUserListingsRequest } from "../../requests/ListingsRequests";
import { AuthContext } from "../../contexts/AuthContext";

const UserLandlordListingsPage: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const [listings, setListings] = useState<Listing[]>([]);
  const loader = useCallback(async () => {
    if (!currentUser) {
      return [];
    }
    return GetUserListingsRequest(currentUser.id);
  }, [currentUser]);
  useEffect(() => {
    loader().then((data) => setListings(data));
  }, [loader]);
  return (
    <Layout pageTitle="Anunturile mele">
      <Grid item container xs={12} sx={{ minHeight: "100vh" }}>
        {listings.map((listing) => (
          <Grid item xs={12}>
            {listing.title}
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default UserLandlordListingsPage;
