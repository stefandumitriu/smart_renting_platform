import * as Yup from "yup";
import { minimumValueErrorMessage, requiredFieldErrorMessage } from "./utils";

export const NewListingSchema = Yup.object().shape({
  apartmentId: Yup.string().uuid().required(requiredFieldErrorMessage),
  title: Yup.string().required(requiredFieldErrorMessage),
  price: Yup.number()
    .min(1, minimumValueErrorMessage(1))
    .required(requiredFieldErrorMessage),
  about: Yup.string().nullable(),
  rentalPeriod: Yup.string().nullable(),
  availability: Yup.string().nullable(),
});
