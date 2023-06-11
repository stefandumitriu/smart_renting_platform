import { Listing } from "@packages/api/models/listings/listing";
import {
  ApartmentStatus,
  BuildingTypeEnum,
  HeatingTypeEnum,
  StreetTypeEnum,
  SubdivisonTypeEnum,
} from "@packages/db";
import similarListingsClassifier from "@packages/api/recommender-system/similarListingsClassifier";

const moment = require("moment");
const { v4 } = require("uuid");

describe("Similar Listings Classifier Test Suite", () => {
  const refListing: Listing = {
    id: "9b09e5b0-6aea-471e-9871-fa136fb35c05",
    lastUpdated: new Date(Date.parse("2023-06-04T21:00:00.000Z")),
    apartmentId: "71eb72c0-51d1-47ba-abb1-16a9a416bac4",
    title: "Test singlefile download",
    price: 250,
    photosUrl: [
      "https://stedumprojlicenta.s3.eu-central-1.amazonaws.com/2023-06-05T22%3A58%3A22.259Z-listing-photo-42442.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUX6FF3SZUYDBM2K4%2F20230610%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230610T131818Z&X-Amz-Expires=900&X-Amz-Signature=2a3f6d409150f5cc7c7191aa6bd3659b133ed3d08d300865c68a3267eac05055&X-Amz-SignedHeaders=host",
    ],
    apartment: {
      id: "71eb72c0-51d1-47ba-abb1-16a9a416bac4",
      addressId: "22611c33-df09-4251-8848-dcb5d8be5956",
      ownerId: "af4fb934-b133-4238-855e-f269b87c9b6d",
      surface: 60,
      noOfRooms: 3,
      noOfBathrooms: 2,
      noOfBalconies: 1,
      subdivision: SubdivisonTypeEnum.Decomandat,
      buildingType: BuildingTypeEnum.Apartament,
      cooling: true,
      heating: HeatingTypeEnum.Centrala,
      utilities: {
        "Curent, Apa, Canalizare, Gaz": true,
        CATV: true,
        "Incalzire pardoseala": false,
        "Internet wireless": false,
      },
      appliances: {
        "Masina de spalat rufe": true,
        "Masina de spalat vase": false,
        TV: false,
        Frigider: false,
        "Cuptor microunde": true,
        Termostat: true,
      },
      finishes: {
        "Usa metalica exterior": false,
        Termopane: false,
        "Izolatie termica": false,
        "Instalatie sanitara premium": false,
      },
      addressProof: "2023-06-05T22:57:03.928Z-address-proof-download.png",
      status: ApartmentStatus.Rented,
      address: {
        id: "22611c33-df09-4251-8848-dcb5d8be5956",
        streetType: StreetTypeEnum.Splai,
        streetName: "Independentei",
        streetNumber: 291,
        lat: 44.4435026,
        long: 26.0559506,
      },
      owner: {
        id: "af4fb934-b133-4238-855e-f269b87c9b6d",
        userId: "google-oauth2|112088494447599549008",
        firstName: "Stefan",
        lastName: "Dumitriu",
        phoneNumber: "0748469998",
        town: "Iași",
        dateOfBirth: new moment("2000-06-20T21:00:00.000Z"),
        about: "Despre mine - descriere - chirias",
        profilePhotoUrl:
          "https://lh3.googleusercontent.com/a/AAcHTtfAlZmBM832gX3MVrL59JJ6CujtTkVVHACEXODQ=s96-c",
        employmentStatus: "Student",
        email: "dumitriustefan21@gmail.com",
      },
    },
  };
  const anotherListing: Listing = {
    id: "251e9858-6b2d-410c-8742-28a261f5e7cb",
    lastUpdated: new Date("2023-06-03T21:00:00.000Z"),
    apartmentId: "add00598-af18-45a1-88fc-fa1092a99a3f",
    title: "Apartament 2 camere cu balcon bloc nou prima închiriere",
    price: 350,
    rentalPeriod: "> 1 an",
    availability: "la finalul lunii",
    apartment: {
      id: "add00598-af18-45a1-88fc-fa1092a99a3f",
      addressId: "3cbf9a4e-43a3-4299-bed7-4d0d3d35c09b",
      ownerId: "0f688fbf-d1bd-4d34-802c-9f19f77397c8",
      surface: 47,
      noOfRooms: 2,
      noOfBathrooms: 1,
      noOfBalconies: 1,
      subdivision: SubdivisonTypeEnum.Decomandat,
      buildingType: BuildingTypeEnum.Apartament,
      cooling: false,
      heating: HeatingTypeEnum.Centrala,
      utilities: {
        "Curent, Apa, Canalizare, Gaz": false,
        CATV: false,
        "Incalizre pardoseala": true,
        "Internet Wireless": true,
      },
      appliances: {
        "Masina de spalat rufe": true,
        "Masina de spalat vase": true,
        TV: true,
        Frigider: true,
        "Cuptor microunde": false,
        Hota: true,
        Termostat: false,
      },
      finishes: {
        "Vopsea lavabila": false,
        "Usa metalica exterior": false,
        "Usi lemn interior": false,
        Termopane: true,
        Gresie: false,
        Parchet: false,
        "Izolatie termica": true,
        "Instalatie sanitara premium": true,
      },
      areaInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non velit vitae augue tristique euismod. Aenean a nulla ipsum. Etiam pharetra id metus luctus dapibus. Sed lobortis varius urna a.",
      status: ApartmentStatus.Listed,
      address: {
        id: "3cbf9a4e-43a3-4299-bed7-4d0d3d35c09b",
        streetType: StreetTypeEnum.Calea,
        streetName: "Ferentari",
        streetNumber: 72,
        block: "G8",
        blockEntrance: 2,
        floor: 5,
        flatNumber: 25,
        lat: 44.40585182830115,
        long: 26.079182227895185,
      },
      owner: {
        id: "0f688fbf-d1bd-4d34-802c-9f19f77397c8",
        userId: "auth0|647b66e93115a9d544f915fd",
        firstName: "Admin",
        lastName: "User",
        phoneNumber: "0723415651",
        town: "București",
        dateOfBirth: new moment("1990-01-30T22:00:00.000Z"),
        about: "Descriere Admin - edited",
        profilePhotoUrl:
          "https://s.gravatar.com/avatar/8baa4d0cb43c9e3bb6ba37033d4e7255?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fad.png",
        employmentStatus: "Angajat",
        email: "admin@app.test",
      },
    },
  };
  const similarPricedListing = { ...anotherListing, price: 250, id: v4() };
  const similarNoOfRoomsListing = { ...refListing, price: 400, id: v4() };
  const similarSurfaceListingClosest = {
    ...refListing,
    apartment: {
      ...refListing.apartment,
      surface: refListing.apartment.surface + 1,
    },
    id: v4(),
  };
  const similarSurfaceListingFurthest = {
    ...refListing,
    apartment: {
      ...refListing.apartment,
      surface: refListing.apartment.surface + 2,
    },
    id: v4(),
  };
  const listingsToClassify = [refListing, anotherListing, similarPricedListing];
  test("doesn't classify itself", () => {
    const classifiedListings = similarListingsClassifier(
      refListing,
      listingsToClassify,
      5
    );
    expect(classifiedListings[listingsToClassify.length - 1].id).toBe(
      refListing.id
    );
  });
  test("returns correct number of entries", () => {
    const n = 2;
    const classifiedListings = similarListingsClassifier(
      refListing,
      [...listingsToClassify, similarNoOfRoomsListing],
      n
    );
    expect(classifiedListings.length).toEqual(n);
  });
  test("weighs price correctly", () => {
    const classifiedListings = similarListingsClassifier(
      refListing,
      listingsToClassify,
      5
    );
    expect(classifiedListings[0].id).toBe(similarPricedListing.id);
  });
  test("weighs number of rooms better than price", () => {
    const classifiedListings = similarListingsClassifier(
      refListing,
      [similarPricedListing, similarNoOfRoomsListing],
      5
    );
    expect(classifiedListings[0].id).toBe(similarNoOfRoomsListing.id);
  });
  test("weighs surface correctly", () => {
    const classifiedListings = similarListingsClassifier(
      refListing,
      [refListing, similarSurfaceListingClosest, similarSurfaceListingFurthest],
      3
    );
    expect(classifiedListings[0].id).toEqual(similarSurfaceListingClosest.id);
  });
});
