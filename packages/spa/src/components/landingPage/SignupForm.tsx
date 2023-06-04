import { styled, TextField } from "@mui/material";

export interface SignupFormValues {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePhotoUrl?: string;
}

export const StyledTextField = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: "10px",
  },
}));
