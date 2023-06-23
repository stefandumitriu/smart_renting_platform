import * as Yup from "yup";
import { minimumValueErrorMessage, requiredFieldErrorMessage } from "./utils";

enum HeatingTypeEnum {
  Centrala = "Centrala Proprie",
  Termoficare = "Termoficare",
}

enum SubdivisonTypeEnum {
  Decomandat = "Decomandat",
  Semidecomandat = "Semidecomandat",
  Nedecomandat = "Nedecomandat",
}

enum StreetTypeEnum {
  Alee = "Aleea",
  Calea = "Calea",
  Strada = "Strada",
  Sosea = "Şoseaua",
  Bulevard = "Bulevardul",
  Splai = "Splaiul",
}

const NewAddressValidationSchema = Yup.object().shape({
  streetType: Yup.string()
    .oneOf(Object.values(StreetTypeEnum))
    .required(requiredFieldErrorMessage),
  streetName: Yup.string().required(requiredFieldErrorMessage),
  streetNumber: Yup.number()
    .min(1, minimumValueErrorMessage(1))
    .required(requiredFieldErrorMessage),
  block: Yup.string(),
  blockEntrance: Yup.number().min(1, minimumValueErrorMessage(1)),
  floor: Yup.number().min(0, minimumValueErrorMessage(0)),
  flatNumber: Yup.number().min(1, minimumValueErrorMessage(1)),
});

export const NewApartmentValidationSchema = Yup.object().shape({
  ownerId: Yup.string().uuid().required(requiredFieldErrorMessage),
  surface: Yup.number()
    .min(1, minimumValueErrorMessage(1))
    .required(requiredFieldErrorMessage),
  noOfRooms: Yup.number()
    .min(1, minimumValueErrorMessage(1))
    .required(requiredFieldErrorMessage),
  noOfBathrooms: Yup.number()
    .min(0, minimumValueErrorMessage(0))
    .required(requiredFieldErrorMessage),
  noOfBalconies: Yup.number()
    .min(0, minimumValueErrorMessage(0))
    .required(requiredFieldErrorMessage),
  subdivision: Yup.string()
    .oneOf(Object.values(SubdivisonTypeEnum))
    .required(requiredFieldErrorMessage),
  cooling: Yup.boolean(),
  heating: Yup.string()
    .oneOf(Object.values(HeatingTypeEnum))
    .required(requiredFieldErrorMessage),
  utilities: Yup.object(),
  appliances: Yup.object(),
  finishes: Yup.object(),
  areaInfo: Yup.string(),
  address: NewAddressValidationSchema.required(requiredFieldErrorMessage),
});
