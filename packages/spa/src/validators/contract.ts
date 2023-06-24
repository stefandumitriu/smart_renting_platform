import * as Yup from "yup";
import { minimumValueErrorMessage, requiredFieldErrorMessage } from "./utils";

export const ContractSchema = Yup.object().shape({
  depositValue: Yup.number()
    .min(0, minimumValueErrorMessage(0))
    .required(requiredFieldErrorMessage),
  rentPayday: Yup.string()
    .matches(/([1-9]{1}|[12]{1}\d{1}|3{1}[01]{1})/, "Zi invalida")
    .length(2, "Zi invalida")
    .required(requiredFieldErrorMessage),
});
