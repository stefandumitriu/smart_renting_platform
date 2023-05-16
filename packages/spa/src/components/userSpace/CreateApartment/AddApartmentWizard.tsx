import React, { useCallback, useContext, useState } from "react";
import Layout from "../../Layout";
import { AuthContext } from "../../../contexts/AuthContext";
import { NewApartment } from "@packages/api/models/listings/apartment";
import { useNavigate } from "react-router-dom";
import { PostApartmentRequest } from "../../../requests/ApartmentsRequests";
import {
  Button,
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  useTheme,
} from "@mui/material";
import AddressProofStep from "./AdressProofStep";
import { Form, Formik, FormikHelpers } from "formik";
import SwipeableViews from "react-swipeable-views";
import ApartmentInfoStep from "./ApartmentInfoStep";
import _ from "lodash";

enum BuildingTypeEnum {
  Apartament = "Bloc de apartamente",
  Casa = "Casa/Vila",
}

const AddApartmentWizard: React.FC<{}> = () => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const steps = [ApartmentInfoStep, AddressProofStep];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = useCallback(() => {
    return activeStep === steps.length - 1;
  }, [activeStep, steps.length]);
  const isFirstStep = useCallback(() => {
    return activeStep === 0;
  }, [activeStep]);
  const handlePrev = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: NewApartment, formikBag: FormikHelpers<NewApartment>) => {
      const { setSubmitting } = formikBag;
      console.log(values);
      if (!isLastStep()) {
        setSubmitting(false);
        setActiveStep(activeStep + 1);
        return;
      }
      setSubmitting(true);
      const formData = new FormData();
      formData.append("address", JSON.stringify(values.address));
      formData.append("utilities", JSON.stringify(values.utilities));
      formData.append("appliances", JSON.stringify(values.appliances));
      formData.append("finishes", JSON.stringify(values.finishes));
      formData.append("addressProof", values.addressProof || "");
      Object.keys(
        _.omit(
          values,
          "address",
          "addressProof",
          "utilities",
          "appliances",
          "finishes"
        )
      ).forEach((key) =>
        formData.append(
          key,
          values[key as keyof NewApartment]?.toString() ?? ""
        )
      );
      const addedApartment = await PostApartmentRequest(formData);
      console.log(addedApartment);
      navigate("/user/dashboard/landlord");
    },
    [activeStep, isLastStep, navigate]
  );
  return currentUser ? (
    <Layout pageTitle="Formular adaugare apartament">
      <Grid item container xs={12}>
        <Formik
          initialValues={
            {
              ownerId: currentUser.id,
              buildingType: BuildingTypeEnum.Apartament,
              utilities: {
                "Curent, Apa, Canalizare, Gaz": false,
                CATV: false,
                "Incalzire pardoseala": false,
                "Internet wireless": false,
              },
              appliances: {
                "Masina de spalat rufe": false,
                "Masina de spalat vase": false,
                TV: false,
                Frigider: false,
                "Cuptor microunde": false,
                Termostat: true,
              },
              finishes: {
                "Usa metalica exterior": false,
                Termopane: false,
                "Izolatie termica": false,
                "Instalatie sanitara premium": false,
              },
            } as unknown as NewApartment
          }
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<StepConnector />}
                sx={{
                  "& .MuiStepLabel-root .Mui-active": {
                    color: theme.palette.secondary.main,
                  },
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {steps.map((step, index) => (
                  <Step key={index} color={theme.palette.secondary.main}>
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Grid
                item
                container
                xs={9}
                justifyContent="space-between"
                spacing={2}
                marginX="auto"
                marginTop={4}
              >
                <Button
                  disabled={isFirstStep()}
                  onClick={handlePrev}
                  color="secondary"
                  variant="contained"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color="secondary"
                  variant="contained"
                >
                  {isLastStep() ? "Submit" : "Next"}
                </Button>
              </Grid>
              <SwipeableViews index={activeStep}>
                {steps.map((step, index) => {
                  const Component = step.component;
                  return <Component key={index} />;
                })}
              </SwipeableViews>
            </Form>
          )}
        </Formik>
      </Grid>
    </Layout>
  ) : (
    <Layout></Layout>
  );
};

export default AddApartmentWizard;
