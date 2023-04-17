import React, { useContext } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { Typography } from "@mui/material";

const AddApartmentWizard: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Layout pageTitle="Formular adaugare apartament">
      <Typography>{currentUser?.id}</Typography>
    </Layout>
  );
};

export default AddApartmentWizard;
