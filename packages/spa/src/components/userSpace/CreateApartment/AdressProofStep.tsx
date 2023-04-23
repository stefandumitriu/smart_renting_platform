import React from "react";
import * as Yup from "yup";
import { Typography } from "@mui/material";

const AddressProofStepComponent: React.FC = () => {
  return <Typography>Address Proof Step</Typography>;
};

const AddressProofValidationSchema = Yup.object().shape({
  addressProof: Yup.string(),
});

const AddressProofStep = {
  component: AddressProofStepComponent,
  label: "Incarcare dovada adresa",
  validationSchema: AddressProofValidationSchema,
};

export default AddressProofStep;
