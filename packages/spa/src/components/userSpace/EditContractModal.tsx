import React, { useCallback } from "react";
import { Contract } from "@packages/api/models/contract";
import {
  Button,
  Fade,
  Grid,
  Modal,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { FormDatePicker } from "../../FormInputsWrappers";
import { StyledTextField } from "../landingPage/SignupForm";
import moment from "moment";
import _ from "lodash";
import { UpdateContractRequest } from "../../requests/ContractsRequest";

interface EditContractModalProps {
  open: boolean;
  handleClose: () => void;
  contract: Contract;
  updateCallback: (contract: Contract) => void;
}

const EditContractModal: React.FC<EditContractModalProps> = ({
  open,
  handleClose,
  contract,
  updateCallback,
}) => {
  const theme = useTheme();
  const submitCallback = useCallback(async (values: Contract) => {
    const differences = _.pickBy(
      values,
      (v, k) => !_.isEqual(contract[k as keyof Contract], v)
    );
    const updatedContract = await UpdateContractRequest(
      contract.id,
      differences
    );
    await updateCallback(updatedContract);
    handleClose();
  }, []);
  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Paper elevation={24}>
          <Formik initialValues={contract} onSubmit={submitCallback}>
            {({ values, handleChange, initialValues }) => {
              return (
                <Form>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    paddingX={4}
                    paddingY={4}
                    rowSpacing={2}
                    sx={{
                      position: "absolute",
                      backgroundColor: "white",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxWidth: "50%",
                      height: "fit-content",
                      minHeight: "40%",
                    }}
                  >
                    <Grid item container xs={12}>
                      <Grid item>
                        <Typography
                          color={theme.palette.secondary.main}
                          variant="h4"
                        >
                          Contract de inchiriere
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} md={5}>
                        <FormDatePicker
                          name="startDate"
                          value={moment(values.startDate)}
                          label="Data incepere contract"
                          sx={{
                            "& fieldset": { borderRadius: "10px" },
                            width: "100%",
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <FormDatePicker
                          name="endDate"
                          value={moment(values.endDate)}
                          label="Data finalizare contract"
                          sx={{
                            "& fieldset": { borderRadius: "10px" },
                            width: "100%",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                      <Grid item xs={12} md={6}>
                        <StyledTextField
                          name="depositValue"
                          label="Garantie"
                          value={values.depositValue}
                          fullWidth
                          onChange={handleChange}
                          required
                          type="number"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} md={2}>
                        <StyledTextField
                          name="rentPayday"
                          label="Zi plata chirie"
                          value={values.rentPayday}
                          fullWidth
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <StyledTextField
                          name="paymentInfo"
                          label="Informatii plata"
                          placeholder="IBAN/Cash etc."
                          value={values.paymentInfo}
                          fullWidth
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                      <Grid item xs={12}>
                        <StyledTextField
                          name="additionalClauses"
                          label="Clauze aditionale"
                          value={values.additionalClauses}
                          fullWidth
                          onChange={handleChange}
                          multiline
                          maxRows={4}
                          minRows={2}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent="end"
                      paddingRight={4}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={_.isEqual(values, initialValues)}
                        >
                          Editeaza draft contract
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditContractModal;
