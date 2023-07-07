import React from "react";
import {
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { FormAutocomplete, FormTextInput } from "../../../FormInputsWrappers";
import { useFormikContext } from "formik";
import { NewApartment } from "@packages/api/models/listings/apartment";
import { NewApartmentValidationSchema } from "../../../validators/apartment";

enum StreetTypeEnum {
  Alee = "Aleea",
  Calea = "Calea",
  Strada = "Strada",
  Sosea = "Şoseaua",
  Bulevard = "Bulevardul",
  Splai = "Splaiul",
}

enum HeatingTypeEnum {
  Centrala = "Centrala Proprie",
  Termoficare = "Termoficare",
}

enum SubdivisonTypeEnum {
  Decomandat = "Decomandat",
  Semidecomandat = "Semidecomandat",
  Nedecomandat = "Nedecomandat",
}

const ApartmentInfoStepComponent: React.FC = () => {
  const theme = useTheme();
  const { values, setFieldValue } = useFormikContext<NewApartment>();
  return (
    <Grid
      item
      container
      xs={10}
      alignContent="start"
      justifyContent="center"
      paddingY={4}
      marginX="auto"
      rowSpacing={4}
    >
      <Grid item xs={12} paddingX={2}>
        <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={4}>
          <Grid container item xs={12} paddingY={2} paddingX={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color={theme.palette.secondary.main}>
                Adresa
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item container xs={12} marginTop={2} rowSpacing={2}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormAutocomplete<StreetTypeEnum>
                    name="address.streetType"
                    label="Tip strada"
                    options={Object.values(StreetTypeEnum)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormTextInput<string>
                    name="address.streetName"
                    label="Nume strada"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="address.streetNumber"
                    label="Numar"
                    fullWidth
                    required
                    type="number"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={2}>
                  <FormTextInput<string>
                    name="address.block"
                    label="Nume bloc"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="address.blockEntrance"
                    label="Scara"
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="address.floor"
                    label="Etaj"
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="address.flatNumber"
                    label="Numar apartament"
                    fullWidth
                    type="number"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormTextInput<string>
                  name="areaInfo"
                  label="Informatii zona"
                  placeholder="Scrie aici orice despre zona in care se situeaza apartamentul tau (supermarket-uri,
                transport, scoli, infrastructura etc.)"
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={2}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} paddingX={2}>
        <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={4}>
          <Grid container item xs={12} paddingY={2} paddingX={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color={theme.palette.secondary.main}>
                Detalii
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item container xs={12} marginTop={2} rowSpacing={2}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormAutocomplete<SubdivisonTypeEnum>
                    name="subdivision"
                    label="Compartimentare"
                    options={Object.values(SubdivisonTypeEnum)}
                    value={values.subdivision}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="noOfRooms"
                    label="Numar camere"
                    fullWidth
                    required
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="noOfBathrooms"
                    label="Numar bai"
                    fullWidth
                    required
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="noOfBalconies"
                    label="Numar balcoane"
                    fullWidth
                    required
                    type="number"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={2}>
                  <FormTextInput<number>
                    name="surface"
                    label="Suprafata (mp.)"
                    fullWidth
                    required
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormAutocomplete<HeatingTypeEnum>
                    name="heating"
                    label="Tip incalzire"
                    value={values.heating}
                    options={Object.values(HeatingTypeEnum)}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} paddingX={2}>
        <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={4}>
          <Grid container item xs={12} paddingY={2} paddingX={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color={theme.palette.secondary.main}>
                Dotari apartament
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item container xs={12} marginTop={2}>
              <Grid item container xs={12}>
                <Typography variant="h5" color={theme.palette.secondary.main}>
                  Utilitati
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={2}
                justifyContent="space-between"
              >
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={values.cooling}
                        defaultChecked={values.cooling}
                        color="secondary"
                      />
                    }
                    label="Aer conditionat"
                    name="cooling"
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue("cooling", checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.utilities
                            ? values.utilities["Curent, Apa, Canalizare, Gaz"]
                            : undefined
                        }
                        defaultChecked={
                          values.utilities
                            ? values.utilities["Curent, Apa, Canalizare, Gaz"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Curent, Apa, Canalizare, Gaz"
                    name={`utilities.Curent, Apa, Canalizare, Gaz`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(
                        `utilities.Curent, Apa, Canalizare, Gaz`,
                        checked
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.utilities
                            ? values.utilities["CATV"]
                            : undefined
                        }
                        defaultChecked={
                          values.utilities ? values.utilities["CATV"] : false
                        }
                        color="secondary"
                      />
                    }
                    label="CATV"
                    name={`utilities.CATV`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`utilities.CATV`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.utilities
                            ? values.utilities["Incalizre pardoseala"]
                            : undefined
                        }
                        defaultChecked={
                          values.utilities
                            ? values.utilities["Incalizre pardoseala"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Incalizre pardoseala"
                    name={`utilities.Incalizre pardoseala`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`utilities.Incalizre pardoseala`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.utilities
                            ? values.utilities["Internet Wireless"]
                            : undefined
                        }
                        defaultChecked={
                          values.utilities
                            ? values.utilities["IInternet Wireless"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Internet Wireless"
                    name={`utilities.Internet Wireless`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`utilities.Internet Wireless`, checked)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item container xs={12} marginTop={2}>
              <Grid item container xs={12}>
                <Typography variant="h5" color={theme.palette.secondary.main}>
                  Dotari
                </Typography>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.appliances
                            ? values.appliances["Masina de spalat rufe"]
                            : undefined
                        }
                        defaultChecked={
                          values.appliances
                            ? values.appliances["Masina de spalat rufe"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Masina de spalat rufe"
                    name={`appliances.Masina de spalat rufe`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`appliances.Masina de spalat rufe`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.appliances
                            ? values.appliances["Masina de spalat vase"]
                            : undefined
                        }
                        defaultChecked={
                          values.appliances
                            ? values.appliances["Masina de spalat vase"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Masina de spalat vase"
                    name={`appliances.Masina de spalat vase`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`appliances.Masina de spalat vase`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.appliances
                            ? values.appliances["TV"]
                            : undefined
                        }
                        defaultChecked={
                          values.appliances ? values.appliances["TV"] : false
                        }
                        color="secondary"
                      />
                    }
                    label="TV"
                    name={`appliances.TV`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`appliances.TV`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.appliances
                            ? values.appliances["Frigider"]
                            : undefined
                        }
                        defaultChecked={
                          values.appliances
                            ? values.appliances["Frigider"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Frigider"
                    name={`appliances.Frigider`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`appliances.Frigider`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.appliances
                            ? values.appliances["Cuptor microunde"]
                            : undefined
                        }
                        defaultChecked={
                          values.appliances
                            ? values.appliances["Cuptor microunde"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Cuptor microunde"
                    name={`appliances.Cuptor microunde`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`appliances.Cuptor microunde`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.appliances
                            ? values.appliances["Termostat"]
                            : undefined
                        }
                        defaultChecked={
                          values.appliances
                            ? values.appliances["Termostat"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Termostat"
                    name={`appliances.Termostat`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`appliances.Termostat`, checked)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item container xs={12} marginTop={2}>
              <Grid item container xs={12}>
                <Typography variant="h5" color={theme.palette.secondary.main}>
                  Finisaje
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={2}
                justifyContent="space-between"
              >
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.finishes
                            ? values.finishes["Usa metalica exterior"]
                            : undefined
                        }
                        defaultChecked={
                          values.finishes
                            ? values.finishes["Usa metalica exterior"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Usa metalica exterior"
                    name={`finishes.Usa metalica exterior`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`finishes.Usa metalica exterior`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.finishes
                            ? values.finishes["Termopane"]
                            : undefined
                        }
                        defaultChecked={
                          values.finishes ? values.finishes["Termopane"] : false
                        }
                        color="secondary"
                      />
                    }
                    label="Termopane"
                    name={`finishes.Termopane`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`finishes.Termopane`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.finishes
                            ? values.finishes["Izolatie termica"]
                            : undefined
                        }
                        defaultChecked={
                          values.finishes
                            ? values.finishes["Izolatie termica"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Izolatie termica"
                    name={`finishes.Izolatie termica`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(`finishes.Izolatie termica`, checked)
                    }
                  />
                </Grid>
                <Grid item xs={12} md="auto">
                  <FormControlLabel
                    control={
                      <Switch
                        value={
                          values.finishes
                            ? values.finishes["Instalatie sanitara premium"]
                            : undefined
                        }
                        defaultChecked={
                          values.finishes
                            ? values.finishes["Instalatie sanitara premium"]
                            : false
                        }
                        color="secondary"
                      />
                    }
                    label="Instalatie sanitara premium"
                    name={`finishes.Instalatie sanitara premium`}
                    labelPlacement="start"
                    onChange={(event, checked) =>
                      setFieldValue(
                        `finishes.Instalatie sanitara premium`,
                        checked
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const ApartmentInfoStep = {
  component: ApartmentInfoStepComponent,
  label: "Informatii Apartament",
  validationSchema: NewApartmentValidationSchema,
};

export default ApartmentInfoStep;
