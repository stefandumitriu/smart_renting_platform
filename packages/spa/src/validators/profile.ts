import * as Yup from "yup";

export const UserProfileSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(/^[0-9]*$/, "Numar de telefon invalid"),
});
